const ApplicationError = require("../application.error");

class BicingServerError extends ApplicationError {
  constructor(message) {
    super(message || "Bicing server error.", 500);
  }
}
module.exports = BicingServerError;
