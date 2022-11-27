const Router = require('express');
const ordersController = require('../controllers/orders.controller');
const router = new Router();


router.get('/get', ordersController.get);
router.post('/create', ordersController.create);
router.put('/put', ordersController.put);
router.delete('/delete', ordersController.delete);
module.exports = router;