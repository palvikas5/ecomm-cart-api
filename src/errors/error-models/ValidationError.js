const BaseError = require('./BaseError');

class ValidationError extends BaseError {
  constructor(errors) {
    super(400, errors);
  }

  static create({ message, property }) {
    return super.create(400, { message, property, code: 'VALIDATION_ERROR' });
  }

  static parseError(error) {
    const errors = [
      {
        statusCode: this.statusCode,
        message: error.message,
        code: 'VALIDATION_ERROR',
      },
    ];
    return new ValidationError(errors);
  }
}

module.exports = ValidationError;
