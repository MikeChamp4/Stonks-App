// Set Enviroment Variables //
require('dotenv').config();

const WebSocket = require('ws');

const app = require('./app.js');
const trickerWs = require('./webSockets/tricker.ws.js');

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

trickerWs.createWebSocket();