const mongoose = require('mongoose');

// Define el esquema para el objeto de datos principal
const shareDetailsInfoSchema = new mongoose.Schema({
  name: String,
  data: companySchema,
});

// Define el esquema para un objeto de datos de una empresa
const companySchema = new mongoose.Schema({
  address: String,
  listedCapital: Number,
  minimunCapital: Number,
  maximunCapital: Number,
  capitalCurrency: String,
  exclusionDate: String,
  websiteURL: String,
  logoURL: String,
  companyKey: String,
  mainShareISIN: String,
  name: String,
  listed: Boolean,
  tradingSystem: Number,
});


// Crea el modelo usando el esquema
const shareDetailsInfoModel = mongoose.model('shareDetailsInfo', shareDetailsInfoSchema);

module.exports = shareDetailsInfoModel;
