const uuid = require('uuid');
const { ValidationError } = require('../errors');

class Validator {
  static IsUUID(target) {
    const isValid = uuid.validate(target);

    if (isValid) {
      return;
    }

    throw new ValidationError(`"${target}" is not UUID.`);
  }

  static validateModel({ schema, model }) {
    return true;
  }
}

module.exports = {
  Validator,
};
