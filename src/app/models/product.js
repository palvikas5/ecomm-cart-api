const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
    min: 1,
  },
});

const Product = model('Product', productSchema);

module.exports = {
  productSchema,
  Product,
};
