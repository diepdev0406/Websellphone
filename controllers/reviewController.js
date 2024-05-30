const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product_id) req.body.product_id = req.params.productId;
  if (!req.body.user_id) req.body.user_id = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = catchAsync(async (req, res, next) => {
  if (req.body.user_id) req.body.user_id = req.user.id;
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    return next(new AppError(404, 'Không review nào có ID này!'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});
exports.deleteReview = factory.deleteOne(Review);
