// tricker.routes.js

const express = require('express');
const router = express.Router();
const trickerCtrl = require('../controllers/tricker.controller');

router.ws('/', trickerCtrl);

module.exports = router;