const ApplicationError = require("../application.error");

class ValoracionNoContentError extends ApplicationError {
  constructor(message) {
    super(message || "No hay contenido para esta llamada", 204);
  }
}
module.exports = ValoracionNoContentError;
