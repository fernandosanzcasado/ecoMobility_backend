const ApplicationError = require("../application.error");

class EstacionNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || "No Estacion found.", 404);
  }
}
module.exports = EstacionNotFoundError;
