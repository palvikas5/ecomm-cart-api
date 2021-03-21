const { computeCart } = require('./cart.helper');
const { Cart } = require('../models/cart');

const getCartById = async (fastify, request, cartId) => {
  const response = await Cart.findById(cartId);
  return response;
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

module.exports = {
  getCartById,
  createCart,
  addToCart,
};
