const { json } = require("body-parser");
const userService = require("../service/user.service");
const {check, validationResult} = require('express-validator');
const passport = require("passport");

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

    async updatePassword(req,res,next){
        try{
            await userService.updatePassword(req.user.email, req.user.password, req.body.checkOldPassword, req.body.newPassword);
            res.json({message: "Password updated successfully."});
        }catch(err){
            next(err);
        }
        

    }

    async updateInfo(req,res,next){
        try{
            await userService.updateInfo(req.user.email, req.body);
            res.json({message: "User fields updated successfully."});
        }catch(err){
            next(err);
        }
    }

    async deleteUser(req,res,next){
        try{
            await userService.deleteUser(req.user.email);
            req.logOut(function(err) {
                if (err) { return next(err); }
              });
            res.json({message: "User deleted successfully"});
        }catch(err){
            next(err);
        }
    }

    async getInfo(req,res,next){
            res.json({ email: req.user.email, name: req.user.name, surnames: req.user.surnames});
    }
    

    async deleteByEmail(req,res,next){
        try{
            const deletedUser = await userService.deleteByEmail(req.params.email);
            res.json({message: "User " + deletedUser.email +  " deleted successfully."});
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

    logOut(req,res,next) {
        req.logOut(function(err) {
            if (err) { return next(err); }
            res.json({message: "User logged out successfully."});
          });    
    }
}




module.exports = new userController();
