const { createProductSchema } = require('./schema/createProduct.schema');
const productHandlers = require('./products.handler');
const { getProductsSchema } = require('./schema/getProducts.schema');

module.exports = async fastify => {
  fastify.route({
    url: '/',
    method: 'GET',
    schema: getProductsSchema,
    handler: productHandlers.getProducts.bind(this, fastify),
  });

  fastify.route({
    url: '/',
    method: 'POST',
    schema: createProductSchema,
    handler: productHandlers.createProduct.bind(this, fastify),
  });
};
