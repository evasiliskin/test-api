const chai = require('chai');
const chaiUUID = require('chai-uuid');
const chaiExclude = require('chai-exclude');
const sinon = require('sinon');
const request = require('supertest');

const { assert } = chai;

const { NotFoundError } = require('../../shared/errors');
const UUIDProvider = require('../../shared/UUID.provider');

const serverApp = require('../../../index');
const UserModel = require('./user.model');
const userService = require('./user.service');

chai.use(chaiUUID);
chai.use(chaiExclude);

describe('routers of users', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /api/users', () => {
    it('return a created user, when a valid payload is passed', async () => {
      const url = '/api/users';

      const payload = {
        username: 'testUserName',
        age: 25,
        hobbies: ['test-hobby'],
      };

      const userModel = { ...payload };
      sinon
        .stub(userService, 'create')
        .withArgs(userModel)
        .resolves({
          ...userModel,
          id: UUIDProvider.provide(),
        });

      const { body: responseBody } = await request(serverApp)
        .post(url)
        .send(payload);

      const expectedBody = {
        username: 'testUserName',
        age: 25,
        hobbies: ['test-hobby'],
      };

      assert.guid(responseBody.id);
      assert.deepEqualExcluding(responseBody, expectedBody, 'id');
    });

    it('return 201, when a valid payload is passed', async () => {
      const url = '/api/users';

      const payload = {
        username: 'testUserName',
        age: 25,
        hobbies: ['test-hobby'],
      };

      const userModel = { ...payload };
      sinon
        .stub(userService, 'create')
        .withArgs(userModel)
        .resolves({
          ...userModel,
          id: UUIDProvider.provide(),
        });

      const { statusCode: responseHttpStatusCode } = await request(serverApp)
        .post(url)
        .send(payload);

      assert.equal(responseHttpStatusCode, 201);
    });
  });

  describe('GET /api/users/{id}', () => {
    it('return an user by the Id, when the user exists', async () => {
      const existingUserId = UUIDProvider.provide();
      const url = `/api/users/${existingUserId}`;

      const userModel = new UserModel({
        id: existingUserId,
        username: 'testUserName',
        age: 25,
        hobbies: ['test-hobby'],
      });

      sinon
        .stub(userService, 'getById')
        .withArgs(existingUserId)
        .resolves(userModel);

      const { body: responseBody } = await request(serverApp).get(url);

      const expectedBody = {
        username: 'testUserName',
        age: 25,
        hobbies: ['test-hobby'],
      };

      assert.guid(responseBody.id);
      assert.deepEqualExcluding(responseBody, expectedBody, 'id');
    });

    it('return 200, when the user exists', async () => {
      const existingUserId = UUIDProvider.provide();
      const url = `/api/users/${existingUserId}`;

      const userModel = new UserModel({
        id: existingUserId,
        username: 'testUserName',
        age: 25,
        hobbies: ['test-hobby'],
      });

      sinon
        .stub(userService, 'getById')
        .withArgs(existingUserId)
        .resolves(userModel);

      const { statusCode: responseHttpStatusCode } = await request(
        serverApp
      ).get(url);

      assert.equal(responseHttpStatusCode, 200);
    });

    it('return 404, when the user is not exist', async () => {
      const absentUserId = UUIDProvider.provide();
      const url = `/api/users/${absentUserId}`;

      sinon
        .stub(userService, 'getById')
        .withArgs(absentUserId)
        .rejects(new NotFoundError());

      const { statusCode: responseHttpStatusCode } = await request(
        serverApp
      ).get(url);

      assert.equal(responseHttpStatusCode, 404);
    });
  });
});
