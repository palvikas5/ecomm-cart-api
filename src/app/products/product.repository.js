const { Product } = require('../models/product');

const findProductsInIds = async productIds => {
  const products = await Product.find({
    _id: { $in: productIds },
  });
  return products;
};

module.exports = {
  findProductsInIds,
};
