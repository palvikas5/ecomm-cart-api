const { Product } = require('../models/product');

module.exports = async fastify => {
  fastify.route({
    url: '/',
    method: 'GET',
    handler: async () => {
      const result = await Product.find();
      return result;
    },
  });

  fastify.route({
    url: '/',
    method: 'POST',
    handler: async request => {
      const product = new Product(request.body);
      return product.save();
    },
  });
};
