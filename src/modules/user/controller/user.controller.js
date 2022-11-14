const { json } = require("body-parser");
const userService = require("../service/user.service");
const {check, validationResult} = require('express-validator');

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class userController{

    async findByEmail(req, res,next) {

        try{
            const data = await userService.findByEmail(req.params.email);
            res.json(data);
        }catch(err){
            next(err);
        }   
    }

    async create(req,res,next){
        try{
            const data = await userService.create(req.body);
            res.json(data);
        }catch(err){
            next(err);
        }    
    }

    async updateUserInfo(req,res,next){

        try{
            const data = await userService.updateUserInfo(req.params.email, req.body);
            res.json(data);
        }catch(err){
            next(err);
        }
    }

    async deleteByEmail(req,res,next){
        try{
            const deletedUser = await userService.deleteByEmail(req.params.email);
            res.json({message: 'User ' + deletedUser.Email +  ' deleted successfully'});
        }catch(err){
            next(err);
        }    
    }

    async loginUser(req,res,next){
        try{
            const data = await userService.findByEmail(req.body.email);
            res.json(data);    
        }catch(err){
            next(err);
        }
    }

    async registerUser(req,res,next){
       try{
        const newUser = await userService.registerUser(req.body);
        res.json({message: "New user registered"});
       }catch(err){
        next(err);
       }
    }
}

module.exports = new userController();
