const userController = require("../modules/user/controller/user.controller");
const {check, validationResult} = require('express-validator');


module.exports = async(app) =>{
    app.get(`/api/users/:email`, userController.findByEmail);
    app.post(`/api/users`, userController.create);
    app.put(`/api/users/:email`, userController.updateUserInfo);
    app.delete(`/api/users/:email`, userController.deleteByEmail);
    app.post(`/api/users/login`, userController.loginUser);
    app.post(`/api/users/register`,[check('email').notEmpty().isEmail(),
                                    check('password').isLength({min:5})],
                                    userController.registerUser);
};
