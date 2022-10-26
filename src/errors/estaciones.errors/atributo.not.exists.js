const ApplicationError = require("../application.error");

class AtributoNotExistError extends ApplicationError {
  constructor(message) {
    super(message || "Some of the attributes passed do not exist.", 400);
  }
}
module.exports = AtributoNotExistError;
