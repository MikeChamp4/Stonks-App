const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const { connection } = require('mongoose');

exports.createWebSocket = async () => {

  const wss = new WebSocket.Server({ port: 3030 });
  const apiKey =
    "1aacecf0423cc97fa52851104822ef5014777b56090a9494d3c686911420ee9b";
  // Almacena todos los mensajes en una matriz
  let messages = [];

  wss.on("connection", function connection(ws) {
    const connection = new WebSocket(
      "wss://streamer.cryptocompare.com/v2?api_key=" + apiKey
    );
    connection.on("open", function open() {
      const subRequest = {
        action: "SubAdd",
        //subs: ["2~Coinbase~BTC~USD", "2~Coinbase~ETH~USD"],
        subs: ["2~Coinbase~BTC~USD"],
      };
      connection.send(JSON.stringify(subRequest));
    });

    connection.on("message", function incoming(data) {
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
        VOLUME24HOURTO: parsedData.VOLUME24HOURTO || 0,
      };

      console.log(filteredData);
      // Agrega los datos filtrados a la variable messages
      messages.push(filteredData);

      ws.send(JSON.stringify(filteredData));

      // setTimeout(function () {
      //   connection.close();
      // }, 10000);
    });
  });

  connection.on('close', () => {
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