class ErrorHandler {
  static async handle(err) {
    /* eslint-disable no-console */
    console.error(`${new Date().toISOString()}: ${err}`);
  }
}

module.exports = ErrorHandler;
