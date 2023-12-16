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

exports.addToCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.body.user, phone: req.body.phone });
  if (cart) {
    cart.quantityAdd += req.body.quantityAdd || 1;
    await cart.save();
  } else {
    cart = await Cart.create(req.body);
  }
  res.status(201).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

exports.getAllCart = factory.getAll(Cart);
