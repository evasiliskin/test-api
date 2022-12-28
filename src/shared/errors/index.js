const ApplicationError = require('./application.error');
const NotFoundError = require('./not-found.error');
const ValidationError = require('./validation.error');
const RoutingErrors = require('./routing');

module.exports = {
  NotFoundError,
  ApplicationError,
  ...RoutingErrors,
  ValidationError,
};
