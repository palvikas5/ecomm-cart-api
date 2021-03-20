const { createServer, startServer } = require('./lib/server');

async function bootstrap() {
  const fastify = createServer();
  await startServer(fastify);
}

bootstrap();
