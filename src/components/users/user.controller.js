const httpStatusCodes = require('../../shared/http-status.codes');
const service = require('./user.service');

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async list() {
    const users = await this.userService.findAll();

    return {
      httpStatusCode: httpStatusCodes.OK,
      actionResult: users,
    };
  }

  async getById(model) {
    // Validator.validateModel
    const user = await this.userService.getById(model.id);

    return {
      httpStatusCode: httpStatusCodes.OK,
      actionResult: user,
    };
  }

  async create(model) {
    // Validator.validateModel
    const createdUser = await this.userService.create(model);

    return {
      httpStatusCode: httpStatusCodes.CREATED,
      actionResult: createdUser,
    };
  }

  async edit(model) {
    // Validator.validateModel
    const updatedUser = await this.userService.update(model);

    return {
      httpStatusCode: httpStatusCodes.OK,
      actionResult: updatedUser,
    };
  }

  async delete(model) {
    // Validator.validateModel
    await this.userService.delete(model.id);

    return {
      httpStatusCode: httpStatusCodes.NO_CONTENT,
    };
  }
}

module.exports = new UserController({
  userService: service,
});
