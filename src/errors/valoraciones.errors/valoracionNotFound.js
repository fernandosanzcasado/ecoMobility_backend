const ApplicationError = require("../application.error");

class ValoracionNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || "Valoracion no encontrada", 404);
  }
}
module.exports = ValoracionNotFoundError;
