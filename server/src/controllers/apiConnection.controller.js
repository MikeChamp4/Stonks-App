const axios = require("axios");
const fs = require("fs");
const urls = require("./../data/urls.json");

const hostApi = "www.bolsasymercados.es";
//const apiConnectionCtrl = require("./apiConnectionGeneralProps.controller.js");
const apiConnectionCtrl = {};

const urlApiCommonHome = urls.ApiInfo.urlApiCommonHome;

const urlApiShareDetailsInfo = urls.ApiInfo.urlApiShareDetailsInfo;
// const companyKey_ACCIONA = urls.ApiInfo.ShareDetailsInfo_CompanyKey.ACCIONA;
// const urlAcciona = urlApiShareDetailsInfo + companyKey_ACCIONA;

const companiesKey = urls.ApiInfo.ShareDetailsInfo_CompanyKey






// Get test //
apiConnectionCtrl.getTest = async (req, res) => {

   try {
      console.log("start")
      const numeros = [1,2,3]
      numeros.length
      const companies = Object.keys(companiesKey).map
      for (const [clave, valor] of Object.entries(companiesKey)) {
         const options = {
            method: "GET",
            url: urlApiShareDetailsInfo + valor,
            host: hostApi,
         };
         console.log(options.url );
            const response = await axios.request(options);
            const data = response.data;
            fs.writeFileSync( "./src/data/Test_" + clave +".json", JSON.stringify(data, null, 2));
            res.json(data);
      }

   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERROR: 500 - An error occurred" });
   }
};



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

   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERROR: 500 - An error occurred" });
   }
};

module.exports = apiConnectionCtrl;
