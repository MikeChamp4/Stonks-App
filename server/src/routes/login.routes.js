const { Router } = require('express');
const homeCtrl = require('../controllers/home.controller');
const loginCtrl = require('../controllers/login.controller');

const router = Router();

router.get('/login', loginCtrl.getLoginPage);
router.post('/login', loginCtrl.postLoginPage);
router.get('/verify', loginCtrl.getVerifyPage);
router.post('/verify', loginCtrl.verifyToken);

module.exports = router;