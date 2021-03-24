const { cartCommonProperties } = require('./commons');

const addToCartSchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: { type: 'string', minLength: 1 },
    },
  },
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'quantity'],
    properties: {
      id: { type: 'string', minLength: 1 },
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
  addToCartSchema,
};
