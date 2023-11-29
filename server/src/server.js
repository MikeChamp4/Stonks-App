const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Start the server //
const server = express();

// Enviroment Variables //
server.set('port', process.env.PORT || 4000);
server.use(morgan('dev'));

// Middlewares //
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// View Engine //
server.set('view engine', 'pug');
server.set('views', path.join(__dirname, '/views'));

// Routes //
server.use(require('./routes/home.routes'));
server.use(require('./routes/login.routes'));


module.exports = server;