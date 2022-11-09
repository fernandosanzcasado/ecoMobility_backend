const ApplicationError = require('../application.error'); 

class IncorrectPassword extends ApplicationError {
  constructor(message) {
    super(message || 'Incorrect password.', 400);
  }
}
module.exports = IncorrectPassword;