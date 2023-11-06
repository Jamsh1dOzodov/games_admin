const router = require("express").Router();
const userController = require("../controllers/UserController");
const verifyJWT = require('../middlewares/Auth');

router.post('/pay/steam', userController.paySteam);
router.post('/support', userController.sendMessageSupport);
router.get('/user', verifyJWT, userController.getMe);

module.exports = router;