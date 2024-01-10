const { Router } = require('express');

const userCtrl = require('../controllers/user.controller');

const router = Router();

router.get('/user/:email', userCtrl.getUser);
router.post('/user/updatePassword', userCtrl.updatePassword);

module.exports = router;