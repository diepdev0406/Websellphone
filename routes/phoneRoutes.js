const express = require('express');
const phoneController = require('../controllers/phoneController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:phoneId/reviews', reviewRouter);

router
  .route('/')
  .get(phoneController.getAllPhones)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    phoneController.createPhone,
  );

router.get(
  '/top-5-cheap',
  phoneController.aliasTopPhones,
  phoneController.getAllPhones,
);

router
  .route('/:id')
  .get(phoneController.getPhone)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    phoneController.uploadPhoneImage,
    phoneController.resizePhoneImage,
    phoneController.updatePhone,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    phoneController.deletePhone,
  );

module.exports = router;
