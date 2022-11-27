const Router = require('express');
const customerController = require('../controllers/customer.controller');
const router = new Router();

router.post('/create', customerController.create);
module.exports = router;