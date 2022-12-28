const { NO_CONTENT } = require('../http-status.codes');

const NO_CONTENT_HTTP_CODES = [NO_CONTENT];

class ResponseHelper {
  static checkIfResponseContentMustBeEmpty(httpCode) {
    const hasContent = NO_CONTENT_HTTP_CODES.includes(httpCode);

    return hasContent;
  }
}

module.exports = ResponseHelper;
