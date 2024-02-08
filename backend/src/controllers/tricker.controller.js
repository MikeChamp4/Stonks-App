const WebSocket = require('ws');
const startCryptoCompareStream = require('../webSockets/tricker.ws.js');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  startCryptoCompareStream(ws);
});

module.exports = wss;