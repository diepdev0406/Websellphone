const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Phone = require('../models/phoneModel');

exports.getOverView = catchAsync(async (req, res, next) => {
  const phones = await Phone.find();

  res.status(200).render('overview', {
    title: 'Trang chủ',
    phones,
  });
});

exports.getPhone = catchAsync(async (req, res, next) => {
  const phone = await Phone.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!phone) {
    return next(new AppError('There is no phone with that name.', 404));
  }

  res.status(200).render('phone', {
    title: `${phone.name}`,
    phone,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Đăng nhập',
  });
};

exports.getAccount = (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};
