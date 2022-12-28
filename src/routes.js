const SiteMapService = require('./site-map.service');
const usersController = require('./components/users/user.controller');

const { routes } = SiteMapService;

module.exports = [
  {
    name: routes.usersRoutes.name,
    basePath: routes.usersRoutes.basePath,
    controller: usersController,
  },
];
