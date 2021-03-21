const createPromotionSchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  body: {
    type: 'object',
    required: ['productId', 'minimumQuantity', 'discountPercentage'],
    properties: {
      description: { type: 'string' },
      minimumQuantity: { type: 'number', minimum: 1 },
      productId: { type: 'string', minLength: 1 },
      discountPercentage: { type: 'number', minimum: 0 },
    },
  },
  response: {
    200: {
      type: 'object',
      required: ['_id', 'productId', 'minimumQuantity', 'discountPercentage'],
      properties: {
        _id: { type: 'string' },
        description: { type: 'string' },
        productId: { type: 'string' },
        minimumQuantity: { type: 'number' },
        discountPercentage: { type: 'number' },
      },
    },
  },
};

module.exports = {
  createPromotionSchema,
};
