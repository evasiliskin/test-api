const routing = require('./shared/routing');
const { RouteResolveError, ActionResolveError } = require('./shared/errors');

const NAMES_OF_ACTIONS_MAP = {
  GET_ALL: 'list',
  GET_ONE: 'getById',
  POST_ONE: 'create',
  PUT_ONE: 'edit',
  DELETE_ONE: 'delete',
};

class ActionResolver {
  static resolve(request) {
    const requestUrl = request.url.toLowerCase();

    const route = routing
      .all()
      .find(
        (r) =>
          requestUrl.endsWith(r.basePath) ||
          requestUrl.startsWith(`${r.basePath}/`) ||
          requestUrl.startsWith(`${r.basePath}?`)
      );

    if (!route) {
      throw new RouteResolveError(
        `A route can not be resolved. 
        The url is: "${request.url}".
        The method is: "${request.method}".`
      );
    }

    const actionName = ActionResolver.#resolveActionName(request);

    if (!actionName) {
      throw new ActionResolveError(
        `An action name can not be resolved. 
        The url is: "${request.url}".
        The method is: "${request.method}".`
      );
    }

    const actionFn = route.controller[actionName].bind(route.controller);

    if (!actionFn) {
      throw new ActionResolveError(
        `The method "${actionName}" is not found.
        The route is: "${route.name}".`
      );
    }

    return actionFn;
  }

  static #resolveActionName(request) {
    const httpMethod = request.method.toUpperCase();
    const keyPrefix = `${httpMethod}`;

    let keyPostfix;

    if (httpMethod === 'POST') {
      keyPostfix = 'ONE';
    } else {
      keyPostfix = request.routeParams.id ? 'ONE' : 'ALL';
    }

    const key = `${keyPrefix}_${keyPostfix}`;

    const actionName = NAMES_OF_ACTIONS_MAP[key];

    return actionName;
  }
}

module.exports = ActionResolver;
