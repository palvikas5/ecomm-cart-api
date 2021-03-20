const Fastify = require('fastify');
const fastifyEnv = require('fastify-env');
const { appSchema } = require('../app/commons/schema');

const createServer = () => {
  const fastify = Fastify({
    logger: {
      prettyPrint: process.env.NODE_ENV !== 'production',
    },
  });

  fastify.register(fastifyEnv, {
    schema: appSchema,
    dotenv: true,
  });

  return fastify;
};

const startServer = async fastify => {
  try {
    await fastify.ready();
    await fastify.listen(fastify.config.PORT, fastify.config.HOST);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = {
  createServer,
  startServer,
};
