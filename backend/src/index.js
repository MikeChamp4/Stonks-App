// Set Enviroment Variables //
require('dotenv').config();

const WebSocket = require('ws');

const app = require('./app.js');
const startCryptoCompareStream = require('./webSockets/tricker.ws.js');
const wss = new WebSocket.Server({ port: 3001 });

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



startCryptoCompareStream(wss);