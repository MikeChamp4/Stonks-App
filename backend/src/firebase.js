// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
const credentials = require("../credentials.json");

// Initialize Firebase
const app = admin.initializeApp({
    credential: admin.credential.cert(credentials)  
  });

  console.log('\n------------ Firebase -------------');
  console.log("firebase is connected");
  console.log('-----------------------------------\n');

const db = admin.firestore();

module.exports = { db };