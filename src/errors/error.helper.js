const util = require('util');

const formatErrorMessage = detail => {
  return typeof detail === 'string' ? detail : util.inspect(detail);
};

const getPropertyPath = (val, validationContext) =>
  (val.dataPath && val.params.missingProperty
    ? `${val.dataPath}/${val.params.missingProperty}`
    : val.params.missingProperty ||
      val.dataPath ||
      validationContext ||
      val.params.propertyName ||
      val.propertyName ||
      val.params.additionalProperty ||
      'empty_property_key'
  )
    .replace('.', '')
    .replace('/', '');

module.exports = {
  formatErrorMessage,
  getPropertyPath,
};
