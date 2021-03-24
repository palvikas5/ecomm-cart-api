const {
  PROMOTION_TYPES,
  RULE_OPERATORS,
  DISCOUNT_TYPES,
  RULE_ATTRIBUTES,
} = require('../promotion.constants');

const createPromotionSchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  body: {
    type: 'object',
    required: ['type', 'rule', 'discount'],
    properties: {
      description: { type: 'string' },
      type: { type: 'string', enum: Object.values(PROMOTION_TYPES) },
      productId: { type: 'string', minLength: 1 },
      rule: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'operator', 'value'],
        properties: {
          name: { type: 'string', enum: Object.values(RULE_ATTRIBUTES) },
          operator: {
            type: 'string',
            enum: Object.values(RULE_OPERATORS),
          },
          value: { type: 'number' },
        },
      },
      discount: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'value'],
        properties: {
          type: { type: 'string', enum: Object.values(DISCOUNT_TYPES) },
          value: { type: 'number' },
        },
      },
    },
  },
  response: {
    200: {
      type: 'object',
      required: ['_id', 'type', 'rule', 'discount'],
      properties: {
        _id: { type: 'string' },
        type: { type: 'string', enum: Object.values(PROMOTION_TYPES) },
        description: { type: 'string' },
        productId: { type: 'string' },
        rule: {
          type: 'object',
          additionalProperties: false,
          required: ['name', 'operator', 'value'],
          properties: {
            name: { type: 'string', enum: Object.values(RULE_ATTRIBUTES) },
            operator: {
              type: 'string',
              enum: Object.values(RULE_OPERATORS),
            },
            value: { type: 'number' },
          },
        },
        discount: {
          type: 'object',
          additionalProperties: false,
          required: ['type', 'value'],
          properties: {
            type: { type: 'string', enum: Object.values(DISCOUNT_TYPES) },
            value: { type: 'number' },
          },
        },
      },
    },
  },
};

module.exports = {
  createPromotionSchema,
};
