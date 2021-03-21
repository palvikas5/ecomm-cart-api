const NotFoundError = require('../../errors/error-models/NotFoundError');
const { computeCart } = require('./cart.helper');
const { Cart } = require('../models/cart');

const getCartById = async (fastify, request, cartId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new NotFoundError(`Cart with ID: ${cartId} not found`);
  }
  return cart;
};

const createCart = async (fastify, request, requestBody) => {
  const computedCart = await computeCart(requestBody.products);
  const cart = new Cart(computedCart);
  return cart.save();
};

const addToCart = async (fastify, request, cartId, requestBody) => {
  const cart = await getCartById(fastify, request, cartId);
  const isNewProduct = cart.cartLines.every(
    cartLine => cartLine.product.id !== requestBody.id,
  );
  const updatedCartLines = cart.cartLines.map(cartLine => {
    const quantity =
      !isNewProduct && cartLine.product.id === requestBody.id
        ? requestBody.quantity
        : 0;
    return {
      id: cartLine.product.id,
      quantity: cartLine.quantity + quantity,
    };
  });

  if (isNewProduct) {
    updatedCartLines.unshift({
      id: requestBody.id,
      quantity: requestBody.quantity,
    });
  }

  const computedCart = await computeCart(updatedCartLines);
  const updatedCart = await Cart.findByIdAndUpdate(cartId, computedCart, {
    new: true,
  });
  return updatedCart;
};

const updateCartLine = async (
  fastify,
  request,
  cartId,
  cartLineId,
  { quantity },
) => {
  const cart = await getCartById(fastify, request, cartId);
  const isCartLinePresent = cart.cartLines.some(line => line.id === cartLineId);
  if (!isCartLinePresent) {
    throw new NotFoundError(`CartLine with id: ${cartLineId} not found`);
  }
  const updatedCartLines = cart.cartLines.map(cartLine => ({
    id: cartLine.product.id,
    quantity: cartLine.id === cartLineId ? quantity : cartLine.quantity,
  }));
  const computedCart = await computeCart(updatedCartLines);
  const updatedCart = await Cart.findByIdAndUpdate(cartId, computedCart, {
    new: true,
  });
  return updatedCart;
};

module.exports = {
  getCartById,
  createCart,
  addToCart,
  updateCartLine,
};
