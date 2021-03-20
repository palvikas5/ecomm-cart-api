const { createServer, startServer } = require('./lib/server');
const routes = require('./app');

async function bootstrap() {
  const fastify = createServer();

  fastify.register(routes);

  await startServer(fastify);
}

bootstrap();
