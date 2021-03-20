const mongoose = require('mongoose');
const fastifyPlugin = require('fastify-plugin');

const databasePlugin = async fastify => {
  const { DB_URL } = fastify.config;

  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = fastifyPlugin(databasePlugin);
