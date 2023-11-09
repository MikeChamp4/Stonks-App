const axios = require('axios');
const fs = require('fs');

const apiConnectionCtrl = {};
const urlApi = 'https://api.bolsasymercados.es/Market/locales/en/common.json?4687300';
const hostApi = 'www.bolsasymercados.es';

apiConnectionCtrl.getJsonFile = async (req, res) => {
    const options = {
        method: 'GET',
        url: urlApi,
        host: hostApi
    };

    try {

        const response = await axios.request(options);
        const data = response.data;
        fs.writeFileSync('IBEX35.json', JSON.stringify(data, null, 2));
        res.json(data);
        console.log(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ERROR: 500 - An error occurred' });
    }
}



module.exports = apiConnectionCtrl;