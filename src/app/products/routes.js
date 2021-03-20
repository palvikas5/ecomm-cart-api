module.exports = async fastify => {
  fastify.route({
    url: '/',
    method: 'GET',
    handler: async () => {
      return {
        hello: 'world',
      };
    },
  });
};
