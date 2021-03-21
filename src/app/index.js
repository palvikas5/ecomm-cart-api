const productRoutes = require('./products/routes');
const { fastifyErrorHandler } = require('../errors');
const cartRoutes = require('./carts/routes');

module.exports = async fastify => {
  fastify.setErrorHandler(fastifyErrorHandler(fastify));

  fastify.register(productRoutes, { prefix: '/products' });
  fastify.register(cartRoutes, { prefix: '/carts' });
};
