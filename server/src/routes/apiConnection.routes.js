const { Router } = require('express');
const apiConnectionCtrl = require('../controllers/apiConnection.controller');


const router = Router();


router.get('/', apiConnectionCtrl.getJsonFile);



module.exports = router;