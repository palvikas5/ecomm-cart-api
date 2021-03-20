const Fastify = require('fastify');
const fastifyEnv = require('fastify-env');
const path = require('path');
const fastifyAutoload = require('fastify-autoload');
const { appSchema } = require('../app/commons/schema');
const routes = require('../app');

const createServer = () => {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'error',
      prettyPrint: process.env.NODE_ENV !== 'production',
    },
  });

  fastify.register(fastifyEnv, {
    schema: appSchema,
    dotenv: true,
  });
  fastify.register(fastifyAutoload, {
    dir: path.resolve(__dirname, '../plugins'),
    ignorePattern: /.*(test|spec).js/,
  });
  fastify.register(routes);

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
