const { Cart } = require('../models/cart');

const findById = async cartId => {
  const cart = await Cart.findById(cartId);
  return cart;
};

const updateCart = async (cartId, cart) => {
  const updatedCart = await Cart.findByIdAndUpdate(cartId, cart, { new: true });
  return updatedCart;
};

const createCart = cartPayload => {
  const cart = new Cart(cartPayload);
  return cart.save();
};

module.exports = {
  findById,
  updateCart,
  createCart,
};
