const getProductsSchema = {
  response: {
    200: {
      type: 'object',
      required: ['data'],
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            required: ['_id', 'name', 'price'],
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              price: { type: 'number' },
            },
          },
        },
      },
    },
  },
};

module.exports = {
  getProductsSchema,
};
