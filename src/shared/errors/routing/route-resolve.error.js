const RouteResolveErrorBase = require('./route-resolve-base.error');

class RouteResolveError extends RouteResolveErrorBase {
  constructor(message) {
    super(message);
    this.name = 'ControllerResolveError';
  }
}

module.exports = RouteResolveError;
