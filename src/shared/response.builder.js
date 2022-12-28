class ResponseBuilder {
  static build({ response, responseHttpStatusCode, bodySerialized }) {
    if (bodySerialized) {
      response.setHeader('Content-Length', Buffer.from(bodySerialized).length);
      response.setHeader('Content-Type', 'application/json');
    }

    response.statusCode = responseHttpStatusCode;

    return response;
  }
}

module.exports = ResponseBuilder;
