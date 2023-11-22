const { Router } = require('express');
const testCtrl = require('../controllers/test.controller');
const homeCtrl = require('../controllers/home.controller');


const router = Router();

const home = '/home'
router.get('/', homeCtrl.getHomeInfoJson);
router.get(home, homeCtrl.getHomeInfoJson);

router.get('/test', testCtrl.getTest);


module.exports = router;