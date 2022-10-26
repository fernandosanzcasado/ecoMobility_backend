const ApplicationError = require('../application.error'); 

class PasswordsDontMatch extends ApplicationError {
  constructor(message) {
    super(message || 'Passwords do not match.', 400);
  }
}
module.exports = PasswordsDontMatch;