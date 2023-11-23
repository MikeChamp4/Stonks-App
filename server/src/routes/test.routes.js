const { Router } = require('express');
const testCtrl = require('../controllers/shareDetailsInfo.controller');
const homeCtrl = require('../controllers/home.controller');


const router = Router();

router.get('/sharedetailsinfo', testCtrl.getShareDetailsInfo);


module.exports = router;