const express = require('express');
const morgan = require('morgan');

const server = express();

// Enviroment Variables //
server.set('port', process.env.PORT || 4000);
server.use(morgan('dev'));

// Routes //
server.use(require('./routes/home.routes'));

// Start the server //
const shareDetailsInfoCtrl = require('./controllers/shareDetailsInfo.controller');
shareDetailsInfoCtrl.getShareDetailsInfo();

module.exports = server;