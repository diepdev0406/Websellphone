const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

router.get('/', authController.isLoggedIn, viewsController.getOverView);
router.get('/phone/:slug', authController.isLoggedIn, viewsController.getPhone);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

module.exports = router;
