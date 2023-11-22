const express = require('express');
const morgan = require('morgan');

const server = express();

// Enviroment Variables //
server.set('port', process.env.PORT || 4000);
server.use(morgan('dev'));

server.use(require('./routes/test.routes.js'));
server.use(require('./routes/home.routes'));

module.exports = server;