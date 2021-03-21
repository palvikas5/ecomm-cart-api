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

module.exports = {
  findProductsInIds,
  findProductById,
};
