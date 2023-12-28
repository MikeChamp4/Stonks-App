const { Router } = require('express');

// Middlewares //
const cookieParserMw = require('../middlewares/cookieParser.middleware');
const jwtToken = require('../middlewares/jwt.middleware');

const loginCtrl = require('../controllers/login.controller');

const router = Router();

router.get('/login', loginCtrl.getLoginPage);
router.get('/login/verify', loginCtrl.getVerifyPage);
router.post('/login' ,loginCtrl.postLoginPage);
router.post('/login/verify',loginCtrl.verifyToken);
router.post('/login/verifyJWT', loginCtrl.verifyJWT);

module.exports = router;