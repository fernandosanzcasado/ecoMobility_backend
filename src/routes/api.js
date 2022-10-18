const userController = require('../modules/user/controller/user.controller');


module.exports = async(app) =>{
    app.get('api/users/:userId', userController.findById);
    app.post('api/users/add', userController.create);

};