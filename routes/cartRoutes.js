const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/:phoneId')
  .post(
    authController.protect,
    cartController.setPhoneUserIds,
    cartController.addToCart,
  );

router.route('/myCart').get(cartController.getMyCart);

module.exports = router;
