const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product_id: String,
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
