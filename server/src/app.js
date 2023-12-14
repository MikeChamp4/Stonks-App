const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Start the app //
const app = express();

// Enviroment Variables //
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));

// Middlewares //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine //
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Routes //
app.use(require('./routes/home.routes'));
app.use(require('./routes/login.routes'));

module.exports = app;