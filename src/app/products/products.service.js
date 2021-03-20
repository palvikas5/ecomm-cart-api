const { Product } = require('../models/product');

const createProduct = async (fastify, request, { name, price }) => {
  const product = new Product({
    name,
    price,
  });
  return product.save();
};

const getProducts = async () => {
  const products = await Product.find();
  return {
    data: products,
  };
};

module.exports = {
  createProduct,
  getProducts,
};
