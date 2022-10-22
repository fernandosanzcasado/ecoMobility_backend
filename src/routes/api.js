const userController = require("../modules/user/controller/user.controller");

module.exports = async (app) => {
  app.get(`/api/v1/users/:Id`, userController.findById);
  app.post(`/api/v1/users`, userController.create);
};
