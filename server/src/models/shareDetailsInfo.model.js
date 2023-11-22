const mongoose = require("mongoose");

mongoose.pluralize(null);

// Define el esquema para un objeto de datos de una empresa
const companySchema = new mongoose.Schema(
  {
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
  },
  {
    collection: 'share_details_info',
  },
);

// Define el esquema para el objeto de datos principal
const shareDetailsInfoSchema = new mongoose.Schema({
  name: String,
  data: companySchema,
});

// Crea el modelo usando el esquema
const shareDetailsInfoModel = mongoose.model(
  "shareDetailsInfo",
  shareDetailsInfoSchema
);

module.exports = shareDetailsInfoModel;
