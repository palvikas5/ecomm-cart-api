const { Schema, model } = require('mongoose');
const {
  PROMOTION_TYPES,
  RULE_ATTRIBUTES,
  RULE_OPERATORS,
  DISCOUNT_TYPES,
} = require('../promotions/promotion.constants');

const promotionSchema = new Schema({
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: Object.values(PROMOTION_TYPES),
  },
  rule: {
    name: {
      type: String,
      enum: Object.values(RULE_ATTRIBUTES),
    },
    operator: {
      type: String,
      enum: Object.values(RULE_OPERATORS),
    },
    value: {
      type: Number,
    },
  },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  discount: {
    type: {
      type: String,
      enum: Object.values(DISCOUNT_TYPES),
    },
    value: {
      type: Number,
    },
  },
});

const Promotion = model('Promotion', promotionSchema);

module.exports = {
  promotionSchema,
  Promotion,
};
