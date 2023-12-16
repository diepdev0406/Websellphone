const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .post(cartController.setPhoneUserIds, cartController.addToCart);

router
  .route('/')
  .get(authController.restrictTo('admin'), cartController.getAllCart);

module.exports = router;
