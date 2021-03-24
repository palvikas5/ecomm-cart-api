const oas = require('fastify-oas');
const fastifyPlugin = require('fastify-plugin');

const swaggerPlugin = async fastify => {
  fastify.register(oas, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Shopping Cart API',
        description: '',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://palvikas5-shopping-cart.herokuapp.com',
        description: '',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });
};

module.exports = fastifyPlugin(swaggerPlugin);
