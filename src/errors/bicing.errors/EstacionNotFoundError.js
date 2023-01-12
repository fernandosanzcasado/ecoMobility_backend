const ApplicationError = require("../application.error");

class EstacionNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || "Station not found error.", 404);
  }
}
module.exports = EstacionNotFoundError;
