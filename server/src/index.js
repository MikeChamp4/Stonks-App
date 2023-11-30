// Set Enviroment Variables //
require('dotenv').config();

const app = require('./app.js');

console.log("--- Server ---");
require('./mongodb.js');
require('./firebase.js');

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
console.log("--------------\n");