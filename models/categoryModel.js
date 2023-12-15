const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'A category must have a name'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

categorySchema.virtual('phones', {
  ref: 'Phone',
  foreignField: 'category',
  localField: '_id',
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
