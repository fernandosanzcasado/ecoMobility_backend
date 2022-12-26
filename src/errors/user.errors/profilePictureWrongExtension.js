const ApplicationError = require('../application.error'); 

class ProfilePictureWrongExtension extends ApplicationError {
  constructor(message) {
    super(message || 'Profile picture has a wrong extension.', 400);
  }
}
module.exports = ProfilePictureWrongExtension;