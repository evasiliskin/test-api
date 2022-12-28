const { Buffer } = require('buffer');

class ModelBinder {
  static async bind(request) {
    const requestUrl = request.url.toLowerCase();

    const routeParams = ModelBinder.#resolveRouteParams(requestUrl);
    request.routeParams = routeParams;

    const body = await ModelBinder.#resolveBody(request);
    request.body = body;

    const model = {
      ...request.body,
      ...request.routeParams,
    };

    request.model = model;

    return request.model;
  }

  static #resolveRouteParams(url) {
    const segments = url.split('/');
    const id = segments[3];

    if (id) {
      return {
        id,
      };
    }

    return {};
  }

  static async #resolveBody(request) {
    const buffers = [];

    /* eslint-disable no-restricted-syntax */
    for await (const chunk of request) {
      buffers.push(chunk);
    }

    const rawBody = Buffer.concat(buffers);

    if (rawBody.length === 0) {
      return {};
    }

    const body = JSON.parse(rawBody.toString());

    return body;
  }
}

module.exports = ModelBinder;
