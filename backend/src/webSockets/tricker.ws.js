const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const { createClient } = require('redis');

let client;

async function startCryptoCompareStream(wsClient) {

  client = await createClient().connect();
  // this is where you paste your api key
  const apiKey = "1aacecf0423cc97fa52851104822ef5014777b56090a9494d3c686911420ee9b";
  const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);

  // Almacena todos los mensajes en una matriz
  let messages = [];

  ccStreamer.on('open', function onStreamOpen() {
    const subRequest = {
      "action": "SubAdd",
      "subs": ["2~Coinbase~BTC~USD"]
    };
    ccStreamer.send(JSON.stringify(subRequest));

    // setTimeout(function () {
    //   ccStreamer.close();
    // }, 10000);
  });

  ccStreamer.on('message', (data) => {
    let parsedData = JSON.parse(data); // Convertir la cadena de datos en un objeto JavaScript

    // Crear un nuevo objeto con solo los campos que te interesan
    let filteredData = {
      FROMSYMBOL: parsedData.FROMSYMBOL || "",
      TOSYMBOL: parsedData.TOSYMBOL || "",
      PRICE: parsedData.PRICE || 0,
      OPEN24HOUR: parsedData.OPEN24HOUR || 0,
      HIGH24HOUR: parsedData.HIGH24HOUR || 0,
      LOW24HOUR: parsedData.LOW24HOUR || 0,
      VOLUME24HOUR: parsedData.VOLUME24HOUR || 0,
      VOLUME24HOURTO: parsedData.VOLUME24HOURTO || 0
    };


    client.set('crypto', JSON.stringify(filteredData), function (err, res) {
      if (err) {
        console.error('Error al establecer el valor en Redis:', err);
      } else {
        console.log('Valor establecido en Redis:', reply);
      }
    });
  
    //res.send(json);

  console.log(filteredData);

  // Agrega los datos filtrados a la variable messages
  messages.push(filteredData);

  if (wsClient.readyState === WebSocket.OPEN) {
    wsClient.send(JSON.stringify(filteredData));
  }

});

ccStreamer.on('close', () => {
  // Define la ruta del archivo
  const filePath = path.join(__dirname, '../data/CryptoCompare', 'testTrickerWs.json');

  // Escribe todos los mensajes en el archivo
  fs.writeFile(filePath, JSON.stringify(messages, null, 2), function (err) {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Messages written to file:', filePath);
    }
  });
});
}

module.exports = startCryptoCompareStream;