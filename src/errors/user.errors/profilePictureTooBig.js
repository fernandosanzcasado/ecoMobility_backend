const ApplicationError = require('../application.error'); 

class ProfilePictureTooBig extends ApplicationError {
  constructor(message) {
    super(message || 'Profile picture is bigger than 2 MB', 400);
  }
}
module.exports = ProfilePictureTooBig;