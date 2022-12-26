const ApplicationError = require('../application.error'); 

class ProfilePictureWrongFormat extends ApplicationError {
  constructor(message) {
    super(message || 'Profile picture has a wrong format. Make sure the image follows this structure : filename.file_extension', 400);
  }
}
module.exports = ProfilePictureWrongFormat;