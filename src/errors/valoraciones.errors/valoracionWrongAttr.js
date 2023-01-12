const ApplicationError = require("../application.error");

class ValoracionWrongAttrError extends ApplicationError {
  constructor(message) {
    super("El atributo " + message + " es invalido", 400);
  }
}
module.exports = ValoracionWrongAttrError;
