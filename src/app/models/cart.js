const { Schema, model } = require('mongoose');
const { productSchema } = require('./product');

const cartSchema = new Schema({
  cartLines: [
    {
      product: {
        type: productSchema,
      },
      quantity: {
        type: Number,
        min: 1,
      },
      itemPrice: {
        type: Number,
        min: 0,
      },
      itemDiscount: {
        type: Number,
        min: 0,
      },
      itemTotal: {
        type: Number,
        min: 0,
      },
    },
  ],
  cartDiscount: {
    type: Number,
    min: 0,
  },
  summary: {
    subTotal: {
      type: Number,
      min: 0,
    },
    totalDiscount: {
      type: Number,
      min: 0,
    },
    totalPrice: {
      type: Number,
      min: 0,
    },
  },
});

const Cart = model('Cart', cartSchema);

module.exports = {
  cartSchema,
  Cart,
};
