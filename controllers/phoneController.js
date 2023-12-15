const sharp = require('sharp');
const multer = require('multer');
const Phone = require('../models/phoneModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Vui lòng chỉ nhập file hình ảnh!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoneImage = upload.single('image');

exports.resizePhoneImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.body.image = `phone-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(240, 240)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/phones/${req.body.image}`);
  next();
});

exports.getAllPhones = factory.getAll(Phone);
exports.getPhone = factory.getOne(Phone, {
  path: 'reviews',
});
exports.createPhone = factory.createOne(Phone);
exports.updatePhone = factory.updateOne(Phone);
exports.deletePhone = factory.deleteOne(Phone);

exports.aliasTopPhones = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  next();
};
