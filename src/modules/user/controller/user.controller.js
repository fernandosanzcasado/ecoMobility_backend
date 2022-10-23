const userService = require("../service/user.service");

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class userController{

    async findByEmail(req, res) {
        const data = await userService.findByEmail(req.params.email);
        res.json(data)
    }

    async create(req,res){
        const data = await userService.create(req.body);
        res.json(data);
    }

    async updateUserInfo(req,res){
        //console.log(req.params.email + req.params.body);
        const data = await userService.updateUserInfo(req.params.email, req.body);
        res.json(data);

    }

    async deleteByEmail(req,res){
        await userService.deleteByEmail(req.params.email);
        res.json('User deleted successfully');
    }
}

module.exports = new userController();
