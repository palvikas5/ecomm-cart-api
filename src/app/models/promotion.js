const { Schema, model } = require('mongoose');

const promotionSchema = new Schema({
  description: {
    type: String,
  },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  minimumQuantity: {
    type: Number,
    min: 1,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
});

const Promotion = model('Promotion', promotionSchema);

module.exports = {
  promotionSchema,
  Promotion,
};
