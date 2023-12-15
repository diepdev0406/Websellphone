const Cart = require('../models/cartModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setPhoneUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.phone) req.body.phone = req.params.phoneId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.addToCart = factory.createOne(Cart);

exports.getMyCart = catchAsync(async (req, res, next) => {
  const carts = await Cart.find({ user: req.user._id });
  res.status(201).json({
    status: 'success',
    data: {
      carts,
    },
  });
});
