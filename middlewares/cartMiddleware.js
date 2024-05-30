const Cart = require('../models/cartModel');

module.exports.cart = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = await Cart.create();

    res.cookie('cartId', cart.id);
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    res.locals.miniCart = cart;
  }

  next();
};
