const ApplicationError = require('../application.error'); 

class tokenNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'No Token found.', 404);
  }
}
module.exports = tokenNotFoundError;