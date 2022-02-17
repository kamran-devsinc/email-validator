module.exports = (app) => {
  const { emailCombination, index } = require('../controllers/email.controller.js');

  const { emailValidationRules, validate } = require('../validators/email.validator');

  app.post('/email-combination', emailValidationRules(), validate, emailCombination);

  app.get('/all-email-combinations', index);
}
