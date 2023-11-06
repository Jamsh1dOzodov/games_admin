const router = require("express").Router();
const controller = require('../controllers/AuthController');


router.post('/signup', controller.register);
router.post('/signin', controller.login);

module.exports = router;