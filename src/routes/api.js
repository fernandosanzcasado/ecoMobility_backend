const userController = require('../modules/user/controller/user.controller');


module.exports = async(app) =>{
    app.get(`/api/v1/users/:UserID`, userController.findByID);
    app.post(`/api/v1/users`, userController.create);
};