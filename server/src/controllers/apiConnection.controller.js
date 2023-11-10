const axios = require("axios");
const fs = require("fs");
const urls = require("./../data/urls.json");

const apiConnectionCtrl = {};
//const urlApi = 'https://api.bolsasymercados.es/Market/locales/en/common.json?4687300';
const urlApiCommonHome = urls.ApiInfo.urlApiCommonHome;
const urlApiCommonIBEX35_Chart = urls.ApiInfo.urlApiCommonIBEX35_Chart;
const urlFocusJson = urls.ApiInfo.urlApiCommonFocus;
const hostApi = "www.bolsasymercados.es";

// Get common home info //
apiConnectionCtrl.getHomeInfoJson = async (req, res) => {
     const options = {
          method: "GET",
          url: urlApiCommonHome,
          host: hostApi,
     };

     try {
        const response = await axios.request(options);
        const data = response.data;
        fs.writeFileSync("HomeInfo.json", JSON.stringify(data, null, 2));
        res.json(data);
        let xd = NaN
        let xd2 = null
        console.log(xd == xd)
        //console.log(data);
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR: 500 - An error occurred" });
     }
};

// Get IBEX35 chart info //
apiConnectionCtrl.getIbex35ChartJson = async (req, res) => {
   const options = {
        method: "GET",
        url: urlApiCommonIBEX35_Chart,
        host: hostApi,
   };

   try {
      const response = await axios.request(options);
      const data = response.data;
      fs.writeFileSync("IBEX35-Chart.json", JSON.stringify(data, null, 2));
      res.json(data);
      //console.log(data);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERROR: 500 - An error occurred" });
   }
};

apiConnectionCtrl.getFocusJson = async (req, res) => {
   const options = {
        method: "GET",
        url: urlFocusJson,
        host: hostApi,
   };

   try {
      const response = await axios.request(options);
      const data = response.data;
      fs.writeFileSync("Focus.json", JSON.stringify(data, null, 2));
      res.json(data);
      //console.log(data);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERROR: 500 - An error occurred" });
   }
};

module.exports = apiConnectionCtrl;
