const { Product } = require('../models/product');

const findProductsInIds = async productIds => {
  const products = await Product.find({
    _id: { $in: productIds },
  });
  return products;
};

const findProductById = async productId => {
  const product = await Product.findById(productId);
  return product;
};

const getProductsRepo = async () => {
  const products = await Product.find();
  return products;
};

const createProductRepo = async productPayload => {
  const product = new Product(productPayload);
  return product.save();
};

module.exports = {
  findProductsInIds,
  findProductById,
  getProductsRepo,
  createProductRepo,
};
