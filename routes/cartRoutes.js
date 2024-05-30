const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/').post(cartController.addToCart).get(cartController.getAllCart);

router.get('/myCart', cartController.getMyCart);

module.exports = router;
