const { check, validationResult } = require('express-validator')

const emailValidationRules = () => {
  return [
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('First name is required'),

    check('lastName')
      .not()
      .isEmpty()
      .withMessage('Last name is required'),

    check('url').isURL(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().forEach((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports  = { emailValidationRules, validate };
