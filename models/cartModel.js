const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  phone: {
    type: mongoose.Schema.ObjectId,
    ref: 'Phone',
    required: [true, 'A cart must belong to a Phone'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A cart must be long to a User'],
  },
  quantityAdd: {
    type: Number,
    default: 1,
    min: [1, 'Quantity must be above 1'],
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
