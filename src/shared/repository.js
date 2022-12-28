const UUIDProvider = require('./UUID.provider');
const { NotFoundError } = require('./errors');
const { Validator } = require('./validator');

class Repository {
  constructor({
    EntityConstructor,
    validationSchemeOnCreate,
    validationSchemeOnUpdate,
    validationSchemeOnGetById,
    validationSchemeOnDeleteById,
  }) {
    this.entities = [];
    this.EntityConstructor = EntityConstructor;
    this.validationSchemeOnCreate = validationSchemeOnCreate;
    this.validationSchemeOnUpdate = validationSchemeOnUpdate;
    this.validationSchemeOnGetById = validationSchemeOnGetById;
    this.validationSchemeOnDeleteById = validationSchemeOnDeleteById;
  }

  async findAll() {
    return this.entities;
  }

  async getById(id) {
    Validator.validateModel({
      schema: this.validationSchemeOnGetById,
      model: { id },
    });

    const targetEntity = this.entities.find((e) => e.id === id);

    const isNotFoundEntity = !targetEntity;

    if (isNotFoundEntity) {
      throw new NotFoundError(`The entity with Id ${id} was not found.`);
    }

    return targetEntity;
  }

  async create(entity) {
    Validator.validateModel({
      schema: this.validationSchemeOnCreate,
      model: entity,
    });

    const newEntity = new this.EntityConstructor({
      ...entity,
      id: UUIDProvider.provide(),
    });

    this.entities.push(newEntity);

    return newEntity;
  }

  async update(entity) {
    Validator.validateModel({
      schema: this.validationSchemeOnUpdate,
      model: entity,
    });

    const indexToUpdate = this.entities.findIndex((e) => e.id === entity.id);

    const isNotFoundEntity = indexToUpdate === -1;

    if (isNotFoundEntity) {
      throw new NotFoundError(`The entity with Id ${entity.id} was not found.`);
    }

    const newEntity = new this.EntityConstructor({
      ...entity,
    });

    this.entities[indexToUpdate] = newEntity;

    const updatedEntity = this.entities[indexToUpdate];

    return updatedEntity;
  }

  async delete(id) {
    Validator.validateModel({
      schema: this.validationSchemeOnDeleteById,
      model: { id },
    });

    const indexToDelete = this.entities.findIndex((e) => e.id === id);

    const isNotFoundEntity = indexToDelete === -1;

    if (isNotFoundEntity) {
      throw new NotFoundError(`The entity with Id "${id}" was not found.`);
    }

    this.entities.splice(indexToDelete, 1);
  }
}

module.exports = Repository;
