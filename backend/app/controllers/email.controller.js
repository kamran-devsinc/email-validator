const Email = require('../models/email.model.js');
const { findCombination, verifyEmails} = require('../helpers/email.helpers');

const emailCombination = async (req, res) => {
  const { firstName, lastName, url } = req.body;

  if(!firstName || !lastName || !url) {
    return res.status(400).send({
      message: "first name, last name or url cannot be empty"
    });
  }

  const emailsCombinations = findCombination(firstName, lastName, url);

  const verifiedEmail = await verifyEmails(emailsCombinations);

  if (!verifiedEmail) {
    res.status(204).send({ message: "No email found"})
  } else {
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
            message: err.message || "Something went wrong."
          });
        });
    }
}

// Retrieve and return all emails from the database.
const index = (_, res) => {
  Email.find()
    .then((emails) => { res.send(emails) })
    .catch((err) => { res.status(500).send({ message: err.message || "Some error occurred while fetching emails." }) });
};

module.exports = { emailCombination, index };
