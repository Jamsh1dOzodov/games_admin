const router = require("express").Router();
const apiController = require('../controllers/ApiController');
const uploadMiddleware = require('../middlewares/Upload');

router.get('/games/get', apiController.get);
router.post('/games/add', uploadMiddleware, apiController.add);
router.put('/games/update/:slug', uploadMiddleware, apiController.update);
router.delete('/games/delete/:id', apiController.delete);

module.exports = router;