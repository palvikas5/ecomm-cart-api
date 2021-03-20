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
    DB_URL: {
      type: 'string',
    },
  },
};

module.exports = {
  appSchema,
};
