const {
  REQUIRED,
  NUMBER,
  UUID,
} = require('../../../shared/validator/validation.rules');

const onCreateValidationSchema = {
  id: {
    type: 'uuid',
    rules: [UUID],
  },
  username: {
    type: 'string',
    rules: [REQUIRED],
  },
  age: {
    type: 'number',
    rules: [NUMBER],
  },
  hobbies: {
    type: 'string',
    isArray: true,
    rules: [REQUIRED],
  },
};

module.exports = onCreateValidationSchema;
