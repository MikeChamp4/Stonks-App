const { Router } = require('express');
const cookieParserMw = require('../middlewares/cookieParser.middleware');
const loginCtrl = require('../controllers/login.controller');

const router = Router();

router.get('/login', cookieParserMw.saveCookie, loginCtrl.getLoginPage);
router.get('/verify', cookieParserMw.saveCookie, loginCtrl.getVerifyPage);
router.post('/login', cookieParserMw.saveCookie, loginCtrl.postLoginPage);
router.post('/verify', cookieParserMw.saveCookie, loginCtrl.verifyToken);

module.exports = router;