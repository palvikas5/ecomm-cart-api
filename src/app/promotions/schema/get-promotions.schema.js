const {
  PROMOTION_TYPES,
  DISCOUNT_TYPES,
  RULE_OPERATORS,
  RULE_ATTRIBUTES,
} = require('../promotion.constants');

const getPromotionsSchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  response: {
    200: {
      type: 'object',
      required: ['data'],
      properties: {
        data: {
          type: 'array',
          items: {
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
                  name: {
                    type: 'string',
                    enum: Object.values(RULE_ATTRIBUTES),
                  },
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
      },
    },
  },
};

module.exports = {
  getPromotionsSchema,
};
