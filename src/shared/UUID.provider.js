const { v4: uuidv4 } = require('uuid');

class UUIDProvider {
  static provide() {
    const uuid = uuidv4();

    return uuid;
  }
}

module.exports = UUIDProvider;
