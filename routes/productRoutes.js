const express = require('express');
const productController = require('../controllers/productController');
// const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
// const cartRouter = require('./cartRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:productId/reviews', reviewRouter);
// router.use('/:productId/carts', cartRouter);

router.route('/').get(productController.getAllProducts).post(
  // authController.protect,
  // authController.restrictTo('admin'),
  productController.createProduct,
);

router.get(
  '/top-5-cheap',
  productController.aliasTopProducts,
  productController.getAllProducts,
);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    // authController.protect,
    // authController.restrictTo('admin'),
    // productController.uploadPhoneImage,
    // productController.resizePhoneImage,
    productController.updateProduct,
  )
  .delete(productController.deleteProduct);

router.get(
  '/:categorySlug/category',
  productController.getAllProductsByCategory,
);

module.exports = router;
