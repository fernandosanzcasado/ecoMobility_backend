const ApplicationError = require('../application.error'); 

class UserAlreadyExists extends ApplicationError {
  constructor(message) {
    super(message || 'User already exists.', 400);
  }
}
module.exports = UserAlreadyExists;