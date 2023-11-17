const axios = require("axios");
const fs = require('fs/promises');
const urls = require("./../data/urls.json");

const hostApi = "www.bolsasymercados.es";

const apiConnectionCtrl = {};

const urlApiCommonHome = urls.ApiInfo.urlApiCommonHome;

const urlApiShareDetailsInfo = urls.ApiInfo.urlApiShareDetailsInfo;
const companiesKey = urls.ApiInfo.ShareDetailsInfo_CompanyKey

// Get test //
apiConnectionCtrl.getTest = async (req, res) => {
   try {
      let data = [];
      for (const [clave, valor] of Object.entries(companiesKey)) {


         await new Promise(resolve => setTimeout(resolve, 6000));


         const options = {
            method: 'GET',
            url: urlApiShareDetailsInfo + valor
         };

         console.log(options.url);

         try {
            const response = await axios(options);
            console.log('Waiting 6 seconds...');

            // Guardar la respuesta en el archivo correspondiente
            //await fs.writeFile(`./src/data/Test_${clave}.json`, JSON.stringify(response.data, null, 2));
            await data.push(response.data);
            
            // Esperar 6 segundos antes de la siguiente iteración
         } catch (error) {
            console.error('Error fetching data for');
            
         }
      }
      fs.writeFile(`./src/data/Test_ShareDetailsInfo.json`, JSON.stringify(data, null, 2));

      res.json({ message: 'Test completed' });
   } catch (error) {
      // console.error(error);
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
