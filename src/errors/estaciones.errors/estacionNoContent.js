const ApplicationError = require("../application.error");

class EstacionNoContentError extends ApplicationError {
  constructor(message) {
    super(message || "No hay contenido para esta llamada", 204);
  }
}
module.exports = EstacionNoContentError;
