// /src/controllers/someController.js

const { sendToClients } = require('../webSockets/tricker.ws.js');

// ... tu código para manejar las solicitudes ...

sendToClients(someData);