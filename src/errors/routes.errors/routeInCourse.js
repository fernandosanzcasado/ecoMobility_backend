const ApplicationError = require('../application.error'); 

class RouteInCourse extends ApplicationError {
  constructor(message) {
    super(message || 'You must finish or cancel your actual route before creating another route.', 400);
  }
}
module.exports = RouteInCourse;