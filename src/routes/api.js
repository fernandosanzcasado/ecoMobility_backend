const userController = require("../modules/user/controller/user.controller");


module.exports = async(app) =>{
    app.get(`/api/users/:email`, userController.findByEmail);
    app.post(`/api/users`, userController.create);
    app.put(`/api/users/:email`, userController.updateUserInfo);
    app.delete(`/api/users/:email`, userController.deleteByEmail);
};
