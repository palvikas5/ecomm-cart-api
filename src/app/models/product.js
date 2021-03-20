const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    min: 0,
  },
});

const Product = model('Product', productSchema);

module.exports = {
  productSchema,
  Product,
};
