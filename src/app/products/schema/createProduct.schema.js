const createProductSchema = {
  body: {
    type: 'object',
    required: ['name', 'price'],
    properties: {
      name: { type: 'string', minLength: 1 },
      price: { type: 'number', min: 1 },
    },
  },
};

module.exports = {
  createProductSchema,
};
