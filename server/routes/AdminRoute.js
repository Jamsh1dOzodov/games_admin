const router = require("express").Router();
const controller = require('../controllers/AdminController');
const verifyJWT = require("../middlewares/Auth");

router.post('/signup', controller.register);
router.post('/signin', controller.login);
router.get('/admin', verifyJWT, controller.getAdmin);

module.exports = router;