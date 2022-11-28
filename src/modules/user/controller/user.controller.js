const { json } = require("body-parser");
const userService = require("../service/user.service");
const {check, validationResult} = require('express-validator');

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class userController{

    async findByEmail(req, res) {
        try{
            const data = await userService.findByEmail(req.params.email);
            res.json(data)
        }catch(err){
            res.status(err.status ?? 500).json(err);
        }   
    }

    async create(req,res){
        try{
            const data = await userService.create(req.body);
            res.json(data);
        }catch(err){
            console.log(err);
            res.status(err.status ?? 500).json(err);
        }    
    }

    async updateUserInfo(req,res){
        try{
            const data = await userService.updateUserInfo(req.params.email, req.body);
            res.json(data);
        }catch(err){
            res.status(err.status ?? 500).json(err);
        }
    }

    async deleteByEmail(req,res){
        try{
            const deletedUser = await userService.deleteByEmail(req.params.email);
            res.json("User with the email: " + deletedUser.Email + " deleted successfully");
        }catch(err){
            res.status(err.status ?? 500).json(err);
        }    
    }

    async loginUser(req,res){
        try{
            const data = await userService.loginUser(req.body);
            res.json(data);    
        }catch(err){
            res.status(err.status ?? 500).json(err);
        }
    }

    async registerUser(req,res){
       try{
        const newUser = await userService.registerUser(req.body);
        res.json(newUser);
       }catch(err){
        res.status(err.status ?? 500).json(err);
       }
    }
}

module.exports = new userController();
