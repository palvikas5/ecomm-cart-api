const productRoutes = require('./products/routes');
const { fastifyErrorHandler } = require('../errors');

module.exports = async fastify => {
  fastify.setErrorHandler(fastifyErrorHandler(fastify));

  fastify.register(productRoutes, { prefix: '/products' });
};
