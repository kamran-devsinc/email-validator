require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

// create app
const app = express();

app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to the database');
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

// home route
app.get('/', (_, res) => {
  res.json({ 'message': "Welcome to the app"});
});

// Require emails routes
require('./app/routes/email.routes.js')(app);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = app;
