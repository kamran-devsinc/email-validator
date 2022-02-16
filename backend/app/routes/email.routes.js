module.exports = (app) => {
  const { emailCombination, index } = require('../controllers/email.controller.js');

  app.post('/email-combination', emailCombination);

  app.get('/all-email-combinations', index);
}
