const { createProductRepo, getProductsRepo } = require('./product.repository');

const createProduct = async (fastify, request, { name, price }) => {
  const product = await createProductRepo({
    name,
    price,
  });
  return product;
};

const getProducts = async () => {
  const products = await getProductsRepo();
  return {
    data: products,
  };
};

module.exports = {
  createProduct,
  getProducts,
};
