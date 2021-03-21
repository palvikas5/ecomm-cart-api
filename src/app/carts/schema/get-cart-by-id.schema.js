const { cartCommonProperties } = require('./commons');

const getCartByIdSchema = {
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
  response: {
    200: {
      type: 'object',
      additionalProperties: false,
      required: ['_id', 'summary', 'cartLines'],
      properties: {
        ...cartCommonProperties,
      },
    },
  },
};

module.exports = {
  getCartByIdSchema,
};
