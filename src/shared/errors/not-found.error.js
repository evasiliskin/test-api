const ApplicationError = require('./application.error');

class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
