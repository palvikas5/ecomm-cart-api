const { formatErrorMessage } = require('./error.helper');
const BaseError = require('./error-models/BaseError');
const { getPropertyPath } = require('./error.helper');

const fastifyErrorHandler = fastify => (error, request, reply) => {
  let statusCode = 500;
  let errors = [
    {
      message: formatErrorMessage(error),
      property: '',
      code: 'INTERNAL_SERVER_ERROR',
    },
  ];

  fastify.log.error(error);

  if (error instanceof BaseError) {
    ({ statusCode, errors } = error);
  } else if (error && error.validation) {
    statusCode = 400;
    errors = error.validation.map(validationError => {
      const property = getPropertyPath(
        validationError,
        error.validationContext,
      );
      const msg = `${property} ${validationError.message}`;
      return {
        property,
        message: msg,
        code: 'VALIDATION_ERROR',
      };
    });
  }

  reply.code(statusCode).send(errors);
};

module.exports = {
  fastifyErrorHandler,
};
