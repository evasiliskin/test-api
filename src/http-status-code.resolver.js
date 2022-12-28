const httpStatusCodes = require('./shared/http-status.codes');
const RouteResolveErrorBase = require('./shared/errors/routing');
const { NotFoundError } = require('./shared/errors');

class HttpStatusCodeResolver {
  static resolve({ error, responseHttpStatusCode }) {
    if (responseHttpStatusCode) {
      return responseHttpStatusCode;
    }

    if (error) {
      if (error instanceof RouteResolveErrorBase.constructor) {
        return httpStatusCodes.NOT_FOUND;
      }

      if (error instanceof NotFoundError.constructor) {
        return httpStatusCodes.NOT_FOUND;
      }

      return httpStatusCodes.INTERNAL_SERVER_ERROR;
    }

    return httpStatusCodes.OK;
  }
}

module.exports = HttpStatusCodeResolver;
