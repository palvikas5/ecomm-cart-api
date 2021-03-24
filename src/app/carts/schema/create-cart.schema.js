const { cartCommonProperties } = require('./commons');

const createCartSchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['products'],
    properties: {
      products: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['id', 'quantity'],
          properties: {
            id: { type: 'string', minLength: 1 },
            quantity: { type: 'number', minimum: 1 },
          },
        },
      },
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
  createCartSchema,
};
