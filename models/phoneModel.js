const mongoose = require('mongoose');
const slugify = require('slugify');

const phoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A phone must have a name'],
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
      max: [5, 'Rating must be below 5.0'],
      min: [1, 'Rating must be above 1.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    price: {
      type: Number,
      required: [true, 'A phone must have a price'],
    },
    quantity: {
      type: Number,
      required: [true, 'A phone must have a quantity'],
    },
    image: String,
    description: String,
    category: {
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

phoneSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'phone',
  localField: '_id',
});

phoneSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

phoneSchema.pre(/^find/, function (next) {
  this.find().select('-__v');

  next();
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
