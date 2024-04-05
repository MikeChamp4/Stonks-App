const express = require('express');
const router = express.Router();
const trickerWs = require('../webSockets/tricker.ws.js');

router.ws('/', trickerWs.createWebSocket);

module.exports = router;