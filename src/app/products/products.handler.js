const productService = require('./products.service');

const createProduct = async (fastify, request) => {
  const { name, price } = request.body;
  const response = await productService.createProduct(fastify, request, {
    name,
    price,
  });
  return response;
};

const getProducts = async () => {
  const response = await productService.getProducts();
  return response;
};

module.exports = {
  createProduct,
  getProducts,
};
