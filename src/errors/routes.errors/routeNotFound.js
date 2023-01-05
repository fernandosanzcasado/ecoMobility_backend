const ApplicationError = require('../application.error'); 

class RouteNotFound extends ApplicationError {
  constructor(message) {
    super(message || 'Route not found.', 400);
  }
}
module.exports = RouteNotFound;