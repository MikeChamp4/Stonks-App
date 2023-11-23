const express = require('express');
const morgan = require('morgan');

// Start the server //
const server = express();

// Enviroment Variables //
server.set('port', process.env.PORT || 4000);
server.use(morgan('dev'));

// Routes //
server.use(require('./routes/home.routes'));


module.exports = server;