const { fastifyErrorHandler } = require('./error.handler');
const { getPropertyPath } = require('./error.helper');
const BaseError = require('./error-models/BaseError');
const NotFoundError = require('./error-models/NotFoundError');
const ValidationError = require('./error-models/ValidationError');

module.exports = {
  fastifyErrorHandler,
  getPropertyPath,
  BaseError,
  NotFoundError,
  ValidationError,
};
