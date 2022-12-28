const Repository = require('../../shared/repository');
const UserModel = require('./user.model');

class UserService extends Repository {
  constructor({ EntityConstructor }) {
    super({
      EntityConstructor,
      validationSchemeOnCreate: {},
      validationSchemeOnUpdate: {},
      validationSchemeOnGetById: {},
      validationSchemeOnDeleteById: {},
    });
  }
}

module.exports = new UserService({
  EntityConstructor: UserModel,
});
