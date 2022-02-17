const Email = require('../models/email.model.js');
const { validationResult } = require('express-validator');
const { findCombination, verifyEmails} = require('../helpers/email.helpers');

const emailCombination = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { firstName, lastName, url } = req.body;

  const emailsCombinations = findCombination(firstName, lastName, url);

  try {
    const verifiedEmail = await verifyEmails(emailsCombinations);

    if (!verifiedEmail) {
      return res.status(204).send({ message: 'No email found'})
    }

    const newValidEmail = new Email({
      name: `${firstName} ${lastName}`,
      verifiedEmail: verifiedEmail
    });

    // Save verified email in the database
    newValidEmail.save()
      .then((data) => {
        res.send(JSON.stringify(data));
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Something went wrong.'
        });
      });
  }
  catch(err) {
    res.status(500).send({
      message: err.message || 'Something went wrong.'
    });
  }

}

// Retrieve and return all emails from the database.
const index = (_, res) => {
  Email.find()
    .then((emails) => { res.send(emails) })
    .catch((err) => { res.status(500).send({ message: err.message || 'Some error occurred while fetching emails.' }) });
};

module.exports = { emailCombination, index };
