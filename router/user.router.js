const Router = require('express');
const userControllers = require('../controllers/user.controllers');
const router = new Router();
router.post('/registration', userControllers.registrationAdmin);
router.post('/login', userControllers.loginAdmin);
router.get('/logout', userControllers.logoutAdmin);
module.exports = router;