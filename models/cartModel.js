const mongoose = require('mongoose');
const Phone = require('./phoneModel');

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
  numberOrders: {
    type: Number,
    default: 1,
  },
});

cartSchema.statics.calcQuantity = async function (phoneId) {
  const stats = await this.aggregate([
    { $match: { phone: phoneId } },
    {
      $group: {
        _id: '$phone',
        nOrders: { $sum: '$numberOrders' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Phone.findByIdAndUpdate(phoneId, {
      $inc: { quantity: -stats[0].nOrders },
    });
  }
};

cartSchema.post('save', function () {
  this.constructor.calcQuantity(this.phone);
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
