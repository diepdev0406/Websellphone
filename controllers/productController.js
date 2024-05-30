const sharp = require('sharp');
const multer = require('multer');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Vui lòng chỉ nhập file hình ảnh!', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

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

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product, {
  path: 'reviews',
});
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-price';
  next();
};

exports.getAllProductsByCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.categorySlug });

  if (!category)
    return next(new AppError('Không có danh mục nào có tên này!', 404));
  const products = await Product.find({ category_id: category._id });

  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});
