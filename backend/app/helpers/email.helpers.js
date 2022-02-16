const axios = require('axios');

const { MAILBOX_LAYER_BASE_URL, MAILBOX_LAYER_ACCESS_KEY } = process.env;
const MAILBOX_LAYER_URL = `${MAILBOX_LAYER_BASE_URL}=${MAILBOX_LAYER_ACCESS_KEY}&smtp=1&format=1`;

const findCombination = (firstName, lastName, domain) => {
  const tmpEmails = [];

  tmpEmails.push(`${firstName}.${lastName}@${domain}`);
  tmpEmails.push(`${firstName}@${domain}`);
  tmpEmails.push(`${lastName}@${domain}`);
  tmpEmails.push(`${firstName}${lastName}@${domain}`);
  tmpEmails.push(`${lastName}.${firstName}@${domain}`);
  tmpEmails.push(`${firstName.charAt(0)}.${lastName}@${domain}`);
  tmpEmails.push(`${firstName.charAt(0)}${lastName.charAt(0)}@${domain}`);

  return tmpEmails;
}

const isVerifiedEmailFromMailBox = async (email) => {
  const URL = `${MAILBOX_LAYER_URL}&email=${email}`;

  const response = await axios.get(URL);

  const { format_valid , mx_found, smtp_check, catch_all } = response.data;

  if (format_valid && mx_found && smtp_check && !catch_all) return true;

  return false;
}

const verifyEmails = async (emails) => {
  for (let email of emails) {
    const isVerified = await isVerifiedEmailFromMailBox(email);

    if (isVerified) return email;
  }

  return null;
}

module.exports = {
  findCombination,
  verifyEmails
}
