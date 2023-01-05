const ApplicationError = require('../application.error'); 

class RouteAlreadyFinished extends ApplicationError {
  constructor(message) {
    super(message || 'This route has finished so it can not be updated.', 400);
  }
}
module.exports = RouteAlreadyFinished;