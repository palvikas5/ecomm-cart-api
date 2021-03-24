const { cartCommonProperties } = require('./commons');

const updateCartLineSchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      cartId: { type: 'string', minLength: 1 },
      cartLineId: { type: 'string', minLength: 1 },
    },
  },
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['quantity'],
    properties: {
      quantity: { type: 'number', minimum: 1 },
    },
  },
  response: {
    200: {
      type: 'object',
      additionalProperties: false,
      required: ['_id', 'summary', 'cartLines', 'cartDiscount'],
      properties: {
        ...cartCommonProperties,
      },
    },
  },
};

module.exports = {
  updateCartLineSchema,
};
