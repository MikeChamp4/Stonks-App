// Set Enviroment Variables //
require('dotenv').config();

const server = require('./server.js');

console.log("--- Server ---");
require('./database.js');

server.listen(server.get('port'));
console.log('Server on port', server.get('port'));
console.log("--------------\n");