const appSchema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'number',
      default: 4444,
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
  },
};

module.exports = {
  appSchema,
};
