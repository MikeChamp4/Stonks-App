const { Router } = require('express');
const testCtrl = require('../controllers/shareDetailsInfo.controller');
const homeCtrl = require('../controllers/home.controller');


const router = Router();

const home = '/home'
router.get('/', homeCtrl.getHomeInfoJson);
router.get(home, homeCtrl.getHomeInfoJson);

router.get('/sharedetailsinfo', testCtrl.getShareDetailsInfo);


module.exports = router;