const { Router } = require('express');
const homeCtrl = require('../controllers/home.controller');


const router = Router();

const home = '/home'
router.get('/', homeCtrl.getHomeInfoJson);
router.get(home, homeCtrl.getHomeInfoJson);


module.exports = router;