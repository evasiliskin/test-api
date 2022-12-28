class SiteMapService {
  static #apiPath = '/api';

  static get routes() {
    const usersRoutes = {
      name: 'users',
      basePath: `${SiteMapService.#apiPath}/users`,
    };

    return {
      usersRoutes,
    };
  }
}

module.exports = SiteMapService;
