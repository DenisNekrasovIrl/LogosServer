const Router = require('express');
const productController = require('../controllers/product.controller');
const router = new Router();
router.post('/getOne', productController.getOne);
router.get('/getRandom', productController.getRandom);
router.get('/getAll', productController.getAll)
router.post('/create', productController.create);
router.put('/put', productController.put);
router.post('/get', productController.get);
router.delete('/delete', productController.delete);
module.exports = router;