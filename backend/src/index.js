// Set Enviroment Variables //
require('dotenv').config();

const WebSocket = require('ws');

const app = require('./app.js');
//const startCryptoCompareStream = require('./webSockets/tricker.ws.js');
const trickerCtrl  = require('./controllers/tricker.controller.js');
const ws = new WebSocket.Server({ port: 3002});

const port = app.get('port');

require('./mongodb.js');
require('./firebase.js');

app.listen(port, () => {
    
    console.log('\n------------ Server ---------------');
    console.log(`Server in port: ${port}`);
    console.log(`DEV URL: http://localhost:${port}`);
    console.log('-----------------------------------\n');
    
    console.log('\n-------- Server Responses ---------');
});

trickerCtrl.startWebSocket(ws);


//startCryptoCompareStream(ws);