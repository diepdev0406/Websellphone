const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sản phẩm bắt buộc phải có tên!'],
      unique: true,
      trim: true,
    },
    slug: String,
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, 'Đánh giá không được quá 5.0'],
      min: [1, 'Đánh giá phải từ 1.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    price: {
      type: Number,
      required: [true, 'Sản phẩm bắt buộc phải có giá bán!'],
    },
    quantity: {
      type: Number,
      required: [true, 'Sản phẩm bắt buộc phải có số lượng'],
    },
    thumbnail: String,
    description: String,
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, { lower: true });

  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
