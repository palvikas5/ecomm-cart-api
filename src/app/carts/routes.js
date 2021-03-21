const cartHandler = require('./carts.handler');
const { updateCartLineSchema } = require('./schema/update-cart-line.schema');
const { addToCartSchema } = require('./schema/add-to-cart.schema');
const { createCartSchema } = require('./schema/create-cart.schema');
const { getCartByIdSchema } = require('./schema/get-cart-by-id.schema');

module.exports = async fastify => {
  fastify.route({
    url: '/:id',
    method: 'GET',
    schema: getCartByIdSchema,
    handler: cartHandler.getCartById.bind(this, fastify),
  });

  fastify.route({
    url: '/',
    method: 'POST',
    schema: createCartSchema,
    handler: cartHandler.createCart.bind(this, fastify),
  });

  fastify.route({
    url: '/:id',
    method: 'POST',
    schema: addToCartSchema,
    handler: cartHandler.addToCart.bind(this, fastify),
  });

  fastify.route({
    url: '/:cartId/cart-lines/:cartLineId',
    method: 'PATCH',
    schema: updateCartLineSchema,
    handler: cartHandler.updateCartLine.bind(this, fastify),
  });
};
