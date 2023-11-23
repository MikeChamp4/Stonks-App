const axios = require("axios");
const fs = require('fs/promises');

const shareDetailsInfoModel = require('../models/shareDetailsInfo.model'); // Importa tu modelo de datos
const urls = require("../data/urls.json");

const shareDetailsInfoCtrl = {};

const urlApiShareDetailsInfo = urls.ApiInfo.urlApiShareDetailsInfo;
const companiesKey = urls.ApiInfo.ShareDetailsInfo_CompanyKey;

shareDetailsInfoCtrl.checkIfJsonFileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
};


shareDetailsInfoCtrl.getJsonFromFile = async (filePath) => {
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}    

shareDetailsInfoCtrl.getShareDetailsInfo = async (req, res) => {
    try {
        let data = [];

        for (const [key, value] of Object.entries(companiesKey)) {
            await new Promise(resolve => setTimeout(resolve, 6000));

            const options = {
                method: 'GET',
                url: urlApiShareDetailsInfo + value
            };

            try {
                console.log('Fetching data for', key, '...');
                console.log(`${key}: ${options.url}`);
                
                const response = await axios(options);

                console.log('Waiting 6 seconds...\n');
            
                const companyData = {
                    name: key,
                    data: response.data
                };

                data.push(companyData);
            } catch (error) {
                console.error('Error fetching data for', key, error.message);
            }
        }

        // Guardar los datos en un archivo
        await fs.writeFile(`./src/data/ShareDetailsInfo.json`, JSON.stringify(data, null, 2));

        // // Verificar y guardar en la base de datos
        // const companiesInDatabase = await shareDetailsInfoModel.find({ name: { $in: Object.keys(companiesKey) } });

        // const companiesToInsert = data.filter(companyData => !companiesInDatabase.some(dbCompany => dbCompany.name === companyData.name));

        // if (companiesToInsert.length > 0) {
        //     await shareDetailsInfoModel.insertMany(companiesToInsert);
        //     console.log('Data inserted into the database.');
        // } else {
        //     console.log('No new data to insert into the database.');
        // }

        console.log("Message: Test completed\n");
    } catch (error) {
        console.error(error);
    }
};

module.exports = shareDetailsInfoCtrl;
