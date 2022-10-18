const userService = require('../service/user.service');

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class userController{

    async findByID(req, res) {
        const data = await UserService.findByID(req.params.UserID)
        res.json(data)
    }

    async create(req,res){
        const data = await userService.create(req.body);
        res.json(data);
    }
}

module.exports = new userController();

