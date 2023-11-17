const { Router } = require('express');
const apiConnectionCtrl = require('../controllers/apiConnection.controller');


const router = Router();

const home = '/home'
router.get('/', apiConnectionCtrl.getHomeInfoJson);
router.get(home, apiConnectionCtrl.getHomeInfoJson);

router.get('/test', apiConnectionCtrl.getTest);


module.exports = router;