const httpStatusCodes = require('./shared/http-status.codes');
const ResponseHelper = require('./shared/response/response.helper');

class BodyResolver {
  static resolve({ responseHttpStatusCode, responseBody, error }) {
    if (
      ResponseHelper.checkIfResponseContentMustBeEmpty(responseHttpStatusCode)
    ) {
      return null;
    }

    if (responseBody) {
      return responseBody;
    }

    if (!error) {
      return {};
    }

    const errorBody = {
      errors: [],
    };

    if (responseHttpStatusCode === httpStatusCodes.INTERNAL_SERVER_ERROR) {
      const errorResult = {
        message: 'Internal Server Error',
      };

      errorBody.errors.push(errorResult);

      return errorBody;
    }

    if (responseHttpStatusCode === httpStatusCodes.NOT_FOUND) {
      const errorResult = {
        message: 'NOT FOUND',
      };

      errorBody.errors.push(errorResult);

      return errorBody;
    }

    return errorBody;
  }
}

module.exports = BodyResolver;
