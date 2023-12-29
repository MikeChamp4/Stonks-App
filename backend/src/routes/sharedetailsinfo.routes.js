const { Router } = require('express');
const shareDetailsInfoCtrl = require('../controllers/shareDetailsInfo.controller');


const router = Router();

router.get('/sharedetailsinfo', shareDetailsInfoCtrl.getShareDetailsInfo);


module.exports = router;