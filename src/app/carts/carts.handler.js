const cartsService = require('./carts.service');

const getCartById = async (fastify, request) => {
  const { id: cartId } = request.params;
  const cart = await cartsService.getCartById(fastify, request, cartId);
  return cart;
};

const createCart = async (fastify, request) => {
  const cart = await cartsService.createCart(fastify, request, request.body);
  return cart;
};

const addToCart = async (fastify, request) => {
  const { id: cartId } = request.params;
  const cart = await cartsService.addToCart(
    fastify,
    request,
    cartId,
    request.body,
  );
  return cart;
};

module.exports = {
  getCartById,
  createCart,
  addToCart,
};
