const ApplicationError = require('./application.error');

class ValidationError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
