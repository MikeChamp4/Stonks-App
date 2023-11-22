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
};

shareDetailsInfoCtrl.getShareDetailsInfo = async (req, res) => {
    try {
        let data = [];

        for (const [key, value] of Object.entries(companiesKey)) {
            await new Promise(resolve => setTimeout(resolve, 6000));

            const options = {
                method: 'GET',
                url: urlApiShareDetailsInfo + value
            };

            console.log(`${key}: ${options.url}`);

            try {
                const response = await axios(options);
                console.log('Waiting 6 seconds...');

                const companyData = {
                    name: key,
                    data: response.data
                };

                data.push(companyData);

            } catch (error) {
                console.error('Error fetching data for', key);
            }
        }

        // Guardar los datos en un archivo
        await fs.writeFile(`./src/data/ShareDetailsInfo.json`, JSON.stringify(data, null, 2));

        res.json({ message: 'Test completed' });
    } catch (error) {
        console.error(error);
    }
};

module.exports = shareDetailsInfoCtrl;
