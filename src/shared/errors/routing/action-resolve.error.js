const RouteResolveErrorBase = require('./route-resolve-base.error');

class ActionResolveError extends RouteResolveErrorBase {
  constructor(message) {
    super(message);
    this.name = 'ActionResolveError';
  }
}

module.exports = ActionResolveError;
