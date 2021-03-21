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
            required: [
              '_id',
              'productId',
              'minimumQuantity',
              'discountPercentage',
            ],
            properties: {
              _id: { type: 'string' },
              description: { type: 'string' },
              productId: { type: 'string' },
              minimumQuantity: { type: 'number' },
              discountPercentage: { type: 'number' },
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
