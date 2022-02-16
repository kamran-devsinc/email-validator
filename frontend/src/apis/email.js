import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

const getVerifiedEmail = (firstName, lastName, url) => (
  axios.post(`${REACT_APP_BASE_URL}/email-combination`, { firstName: firstName, lastName: lastName, url: url })
);

const getAllVerifiedEmails = () => axios.get(`${REACT_APP_BASE_URL}/all-email-combinations`);

export {
  getVerifiedEmail,
  getAllVerifiedEmails
}
