class BaseError extends Error {
  constructor(statusCode, errors) {
    super();
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static create(statusCode, { message, property, code }) {
    const errors = [
      {
        statusCode,
        message,
        property,
        code,
      },
    ];
    return new BaseError(statusCode, errors);
  }
}

module.exports = BaseError;
