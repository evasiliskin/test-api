const EntityBase = require('../../shared/models/entity.base');

class UserModel extends EntityBase {
  constructor({ id, username, age, hobbies }) {
    /*        validator.validateModel(validationScheme, {
            id,
            username,
            age,
            hobbies,
        }); */

    super({
      id,
    });

    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}

module.exports = UserModel;
