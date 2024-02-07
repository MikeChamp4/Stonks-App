const axios = require("axios");
const fs = require('fs');
const urls = require("../data/BolsasYMercados_IBEX35/urls.json");

const hostApi = "www.bolsasymercados.es";

const homeCtrl = {};

const urlApiCommonHome = urls.ApiInfo.urlApiCommonHome;

// Get common home info //
homeCtrl.getHomeInfoJson = async (req, res) => {
    const options = {
       method: "GET",
       url: urlApiCommonHome,
       host: hostApi,
    };
 
    try {
       const response = await axios.request(options);
       const data = response.data;
       fs.writeFileSync("./src/data/HomeInfo.json", JSON.stringify(data, null, 2));
       res.json(data);
 
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: "ERROR: 500 - An error occurred" });
    }
 };

 module.exports = homeCtrl;