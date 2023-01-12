const ApplicationError = require('../application.error'); 

class userHasNoActiveRoute extends ApplicationError {
  constructor(message) {
    super(message || 'This user does not have any active route right now.', 400);
  }
}
module.exports = userHasNoActiveRoute;