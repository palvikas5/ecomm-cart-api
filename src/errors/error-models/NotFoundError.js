const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
  constructor(message) {
    const statusCode = 404;
    super(statusCode, [{ statusCode, message }]);
  }
}

module.exports = NotFoundError;
