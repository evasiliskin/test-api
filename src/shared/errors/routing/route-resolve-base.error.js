const ApplicationError = require('../application.error');

class RouteResolveErrorBase extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'RouteResolveErrorBase';
  }
}

module.exports = RouteResolveErrorBase;
