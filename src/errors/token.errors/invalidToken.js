const ApplicationError = require('../application.error'); 

class invalidTokenError extends ApplicationError {
  constructor(message) {
    super(message || 'Invalid token.', 400);
  }
}
module.exports = invalidTokenError;