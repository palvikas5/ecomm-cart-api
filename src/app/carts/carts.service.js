const NotFoundError = require('../../errors/error-models/NotFoundError');
const { computeCart } = require('./cart.helper');
const cartRepo = require('./cart.repository');

const getCartById = async (fastify, request, cartId) => {
  const cart = await cartRepo.findById(cartId);
  if (!cart) {
    throw new NotFoundError(`Cart with ID: ${cartId} not found`);
  }
  const productsWithIdAndQuantity = cart.cartLines.map(cartLine => ({
    id: cartLine.product.id,
    quantity: cartLine.quantity,
  }));
  const computedCart = await computeCart(productsWithIdAndQuantity);
  const updatedCart = await cartRepo.updateCart(cartId, computedCart);
  return updatedCart;
};

const createCart = async (fastify, request, requestBody) => {
  const computedCart = await computeCart(requestBody.products);
  const cart = await cartRepo.createCart(computedCart);
  return cart;
};

const addToCart = async (fastify, request, cartId, requestBody) => {
  const cart = await cartRepo.findById(cartId);
  if (!cart) {
    throw new NotFoundError(`Cart with ID: ${cartId} not found`);
  }
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
  const updatedCart = await cartRepo.updateCart(cartId, computedCart);
  return updatedCart;
};

const updateCartLine = async (
  fastify,
  request,
  cartId,
  cartLineId,
  { quantity },
) => {
  const cart = await cartRepo.findById(cartId);
  if (!cart) {
    throw new NotFoundError(`Cart with ID: ${cartId} not found`);
  }
  const isCartLinePresent = cart.cartLines.some(line => line.id === cartLineId);
  if (!isCartLinePresent) {
    throw new NotFoundError(`CartLine with id: ${cartLineId} not found`);
  }
  const updatedCartLines = cart.cartLines.map(cartLine => ({
    id: cartLine.product.id,
    quantity: cartLine.id === cartLineId ? quantity : cartLine.quantity,
  }));
  const computedCart = await computeCart(updatedCartLines);
  const updatedCart = await cartRepo.updateCart(cartId, computedCart);
  return updatedCart;
};

module.exports = {
  getCartById,
  createCart,
  addToCart,
  updateCartLine,
};
