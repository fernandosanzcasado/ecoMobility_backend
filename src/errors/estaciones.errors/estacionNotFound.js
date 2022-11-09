const ApplicationError = require("../application.error");

class EstacionNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || "Estacion not found.", 404);
  }
}
module.exports = EstacionNotFoundError;
