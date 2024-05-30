const Cart = require('../models/cartModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ _id: req.cookies.cartId });

  const existProductInCart = cart.products.find(
    // eslint-disable-next-line eqeqeq
    (item) => item.product_id == req.body.productId,
  );
  console.log(existProductInCart);
  if (existProductInCart) {
    const quantityUpdate = existProductInCart.quantity + req.body.quantity;

    await Cart.updateOne(
      {
        _id: req.cookies.cartId,
        'products.product_id': req.body.productId,
      },
      {
        $set: { 'products.$.quantity': quantityUpdate },
      },
    );
  } else {
    const objectCart = {
      product_id: req.body.productId,
      quantity: req.body.quantity,
    };
    await Cart.updateOne(
      { _id: req.cookies.cartId },
      { $push: { products: objectCart } },
    );
  }

  res.status(201).json({
    status: 'success',
    message: 'Thêm vào giỏ hàng thành công!',
  });
});

exports.getCart = factory.getOne(Cart);

exports.getAllCart = factory.getAll(Cart);

exports.getMyCart = catchAsync(async (req, res, next) => {
  console.log(req.cookies.cartId);
  const carts = await Cart.findOne({ _id: req.cookies.cartId });
  if (!carts) {
    return next(new AppError('Người dùng này hiện tại chưa có giỏ hàng!', 404));
  }
  res.status(201).json({
    data: 'success',
    carts,
  });
});
