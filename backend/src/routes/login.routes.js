const { Router } = require('express');

const loginCtrl = require('../controllers/login.controller');

const router = Router();

router.get('/login', loginCtrl.getLoginPage);
router.post('/login' ,loginCtrl.postLoginPage);
router.post('/logout', loginCtrl.logout);
router.get('/login/verify', loginCtrl.getVerifyPage);
router.post('/login/verify',loginCtrl.verifyToken);
router.post('/login/verifyJWT', loginCtrl.verifyJWT);
router.post('/login/password', loginCtrl.password);

module.exports = router;