const ApplicationError = require("../application.error");

class MissingAtributoError extends ApplicationError {
  constructor(message) {
    super(message || "Missing mandatory attribute.", 400);
  }
}
module.exports = MissingAtributoError;
