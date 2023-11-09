const express = require('express');
const morgan = require('morgan');

const server = express();

// Enviroment Variables //
server.set('port', process.env.PORT || 4000);
server.use(morgan('dev'));
server.use(require('./routes/apiConnection.routes.js'));

module.exports = server;