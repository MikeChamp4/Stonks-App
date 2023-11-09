const mongoose = require('mongoose');

const { STONKS_APP_MONGODB_HOST, STONKS_APP_MONGODB_DATABASE } = process.env;
const MONGODB_HOST = `mongodb://${STONKS_APP_MONGODB_HOST}/${STONKS_APP_MONGODB_DATABASE}`;

console.log(MONGODB_HOST);

mongoose.connect(MONGODB_HOST, {
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));