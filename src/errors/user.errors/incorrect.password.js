const ApplicationError = require('../application.error'); 

class IncorrectPassword extends ApplicationError {
  constructor(message) {
    super(message || 'Incorrect password.', 404);
  }
}
module.exports = IncorrectPassword;