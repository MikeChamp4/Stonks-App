const mongoose = require("mongoose");
const shareDetailsInfoCtrl = require("./controllers/shareDetailsInfo.controller");

const {
  STONKS_APP_MONGODB_HOST,
  STONKS_APP_MONGODB_DATABASE,
  STONKS_APP_MONGODB_COLLECTION,
} = process.env;
const MONGODB_HOST = `mongodb://${STONKS_APP_MONGODB_HOST}/${STONKS_APP_MONGODB_DATABASE}`;

const nameDatabase = STONKS_APP_MONGODB_DATABASE;
const nameCollection = STONKS_APP_MONGODB_COLLECTION;

mongoose
  .connect(MONGODB_HOST)
  .then(async () => {
    console.log("DB is connected\n");

    // const collections = await mongoose.connection.db
    //   .listCollections()
    //   .toArray();

    // const collectionExists = collections.some(
    //   (collection) => collection.name === nameCollection
    // );

    // if (!collectionExists) {
    //   console.log(`Creating collection: ${nameCollection}`);
    //   await mongoose.connection.useDb(nameDatabase).createCollection(nameCollection);
    // }

    // await shareDetailsInfoCtrl.getShareDetailsInfo();
    // const jsonFilePath = "./src/data/ShareDetailsInfo.json";

    // const jsonData = await shareDetailsInfoCtrl.getJsonFromFile(jsonFilePath);
    // const collection = mongoose.connection.useDb(nameDatabase).collection(nameCollection);
    
    // jsonData.forEach(async (item) => {

    //   let doc = await collection.findOne({name:item.name});
      
    //   if(!doc) {
    //     await collection.insertOne(item);
    //   }else{
    //     await collection.updateOne({name:item.name}, {$set: item});
    //   }
      
    // });

    // console.log("Data inserted into the database.");

    });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
