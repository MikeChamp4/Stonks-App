const mongoose = require("mongoose");
const shareDetailsInfoModel = require("./models/shareDetailsInfo.model");
const shareDetailsInfoCtrl = require("./controllers/shareDetailsInfo.controller");

const { STONKS_APP_MONGODB_HOST, STONKS_APP_MONGODB_DATABASE } = process.env;
const MONGODB_HOST = `mongodb://${STONKS_APP_MONGODB_HOST}/${STONKS_APP_MONGODB_DATABASE}`;

console.log(MONGODB_HOST);

const nameCollection = "share_details_info";

mongoose
  .connect(MONGODB_HOST)
  .then(async () => {
    console.log("DB is connected");

    // Verificar si la colección existe, si no, crearla
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === nameCollection
    );

    if (!collectionExists) {
      console.log(`Creating collection: ${nameCollection}`);
      await mongoose.connection.db.createCollection(nameCollection);
    }

    // Insertar datos al arrancar la aplicación solo si el archivo JSON existe
    //const jsonData = any;
    await (shareDetailsInfoCtrl.getShareDetailsInfo())
    const jsonFilePath = "./data/ShareDetailsInfo.json";

    const jsonData = shareDetailsInfoCtrl.getJsonFromFile(jsonFilePath);
    mongoose.connection.collection(nameCollection).insertMany(jsonData);

    console.log(jsonData)
    console.log("Data inserted into the database.");

  })
  .catch((err) => console.error(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
