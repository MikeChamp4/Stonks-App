const { Router } = require('express');
const apiConnectionCtrl = require('../controllers/apiConnection.controller');


const router = Router();

const home = '/home'
router.get('/', apiConnectionCtrl.getHomeInfoJson);
router.get(home, apiConnectionCtrl.getHomeInfoJson);

router.get('/test', apiConnectionCtrl.getTest);
// router.get('/ibex35_chart', apiConnectionCtrl.getIbex35ChartJson);
// router.get('/home/focus', apiConnectionCtrl.getFocusJson);


module.exports = router;