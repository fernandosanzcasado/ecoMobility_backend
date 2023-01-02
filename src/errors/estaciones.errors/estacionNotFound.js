const ApplicationError = require("../application.error");

class EstacionNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || "Estacion no encontrada", 404);
  }
}
module.exports = EstacionNotFoundError;
