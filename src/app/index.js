const productRoutes = require('./products/routes');

module.exports = async fastify => {
  fastify.register(productRoutes, { prefix: '/products' });
};
