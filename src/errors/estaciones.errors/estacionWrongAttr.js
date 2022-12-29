const ApplicationError = require("../application.error");

class EstacionWrongAttrError extends ApplicationError {
  constructor(message) {
    super("Fitrar por el atributo " + message + " es invalido", 400);
  }
}
module.exports = EstacionWrongAttrError;
