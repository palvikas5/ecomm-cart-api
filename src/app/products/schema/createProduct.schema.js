const createProductSchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  body: {
    type: 'object',
    required: ['name', 'price'],
    properties: {
      name: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 1 },
    },
  },
};

module.exports = {
  createProductSchema,
};
