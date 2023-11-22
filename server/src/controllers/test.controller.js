const axios = require("axios");
const fs = require('fs/promises');
const urls = require("../data/urls.json");


const testCtrl = {};


const urlApiShareDetailsInfo = urls.ApiInfo.urlApiShareDetailsInfo;
const companiesKey = urls.ApiInfo.ShareDetailsInfo_CompanyKey

// Get test //
testCtrl.getTest = async (req, res) => {
   try {
      let data = [];
      for (const [key, value] of Object.entries(companiesKey)) {


         await new Promise(resolve => setTimeout(resolve, 6000));


         const options = {
            method: 'GET',
            url: urlApiShareDetailsInfo + value
         };

         console.log(options.url);

         try {
            const response = await axios(options);
            console.log('Waiting 6 seconds...');

            await data.push(response.data);
            
            // Esperar 6 segundos antes de la siguiente iteración
         } catch (error) {
            console.error('Error fetching data for');
            
         }
      }
      fs.writeFile(`./src/data/ShareDetailsInfo.json`, JSON.stringify(data, null, 2));

      res.json({ message: 'Test completed' });
   } catch (error) {
      // console.error(error);
   }
};

module.exports = testCtrl;