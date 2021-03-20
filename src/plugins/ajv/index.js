const fastifyPlugin = require('fastify-plugin');
const Ajv = require('ajv').default;
const AjvKeywords = require('ajv-keywords');
const { BaseError, getPropertyPath } = require('../../errors');

const validateSchema = ajv => (schema, data) => {
  if (!ajv.validate(schema, data)) {
    const errors = ajv.errors.map(val => ({
      property: getPropertyPath(val),
      message: val.message,
      code: 'SERVER_VALIDATION_ERROR',
    }));

    throw new BaseError(500, errors);
  }
};

const ajvPlugin = async fastify => {
  const ajv = new Ajv({
    removeAdditional: false,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
  });
  AjvKeywords(ajv, ['transform']);

  fastify.setValidatorCompiler(fastifyRouteSchemaDefinition => {
    return ajv.compile(fastifyRouteSchemaDefinition.schema);
  });
  fastify.decorate('validateSchema', validateSchema(ajv));
};

module.exports = fastifyPlugin(ajvPlugin);
