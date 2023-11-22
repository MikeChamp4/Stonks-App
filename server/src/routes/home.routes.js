const { Router } = require('express');
const apiConnectionCtrl = require('../controllers/shareDetailsInfo.controller');
const homeCtrl = require('../controllers/home.controller');


const router = Router();

const home = '/home'
router.get('/', homeCtrl.getHomeInfoJson);
router.get(home, homeCtrl.getHomeInfoJson);

//router.get('/test', apiConnectionCtrl.getTest);


module.exports = router;