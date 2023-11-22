const mongoose = require('mongoose');
const shareDetailsInfoCtrl = require('./controllers/shareDetailsInfo.controller');
const urls = require("../data/urls.json");

const { STONKS_APP_MONGODB_HOST, STONKS_APP_MONGODB_DATABASE } = process.env;
const MONGODB_HOST = `mongodb://${STONKS_APP_MONGODB_HOST}/${STONKS_APP_MONGODB_DATABASE}`;

console.log(MONGODB_HOST);

mongoose.connect(MONGODB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('DB is connected');

        // Verificar si la colección existe, si no, crearla
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === 'share_details_info');

        if (!collectionExists) {
            console.log('Creating collection: share_details_info');
            await mongoose.connection.db.createCollection('share_details_info');
        }

        // Insertar datos al arrancar la aplicación solo si el archivo JSON existe
        const jsonFilePath = './src/data/ShareDetailsInfo.json';
        const jsonExists = await shareDetailsInfoCtrl.checkIfJsonFileExists(jsonFilePath);

        if (jsonExists) {
            const jsonData = await shareDetailsInfoCtrl.getJsonFromFile(jsonFilePath);
            await shareDetailsInfoModel.create(jsonData);
            console.log('Data inserted into the database.');
        } else {
            console.log('No JSON file found. No data inserted into the database.');
        }
    })
    .catch(err => console.error(err));
    
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
