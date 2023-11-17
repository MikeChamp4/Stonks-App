const axios = require("axios");
const fs = require('fs/promises');
const urls = require("./../data/urls.json");
const { set } = require("mongoose");

const hostApi = "www.bolsasymercados.es";

const apiConnectionCtrl = {};

const urlApiCommonHome = urls.ApiInfo.urlApiCommonHome;

const urlApiShareDetailsInfo = urls.ApiInfo.urlApiShareDetailsInfo;
const companiesKey = urls.ApiInfo.ShareDetailsInfo_CompanyKey

// Get test //
apiConnectionCtrl.getTest = async (req, res) => {
   try {

      for (const [clave, valor] of Object.entries(companiesKey)) {
         const options = {
            method: 'GET',
            url: urlApiShareDetailsInfo + valor,
            // host: hostApi, // Este campo no es necesario en axios
         };

         console.log(options.url);

         try {
            const response = await axios(options);
            console.log('Waiting 6 seconds...', response.data);

            // Guardar la respuesta en el archivo correspondiente
            await fs.writeFile(`./src/data/Test_${clave}.json`, JSON.stringify(response.data, null, 2));

            // Esperar 6 segundos antes de la siguiente iteración
            await new Promise(resolve => setTimeout(resolve, 6000));
         } catch (error) {
            console.error('Error fetching data for', clave, error);
         }
      }

      res.json({ message: 'Test completed' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'ERROR: 500 - An error occurred' });
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
