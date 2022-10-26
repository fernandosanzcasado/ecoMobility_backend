const { json } = require("body-parser");
const userRepository = require("../repository/user.repository");
const bcrypt = require('bcrypt')

const UserNotFoundError = require("../../../errors/user.errors/user.not.found");
const IncorrectPassword = require("../../../errors/user.errors/incorrect.password");
const UserAlreadyExists = require("../../../errors/user.errors/user.already.exists");
const PasswordsDontMatch = require("../../../errors/user.errors/passwords.dont.match");


//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class userService{


    async findByEmail(email){
        const data = await userRepository.findByEmail(email);
    if (data) {
      return data.Item;
    }
    return data;
  }


    async create(data){
        
        return await userRepository.createUser({
            email: data.email,
            name: data.name,
            surnames: data.surnames,
            password: data.password,
        });
    }

    async updateUserInfo(email,data){
        return await userRepository.updateUserInfo(email,data);
    }

    async deleteByEmail(email){
        return await userRepository.deleteUserByEmail(email);
    }



    async  loginUser(data){
        const user = await userRepository.findByEmail(data.email);
        
        if(!user.Item){
           throw new UserNotFoundError();
        }else if(user.Item.Password !== data.password){
            throw new IncorrectPassword();
        }else{
        return user;
        } 
    }

    async registerUser(data){
        const userInDB = await userRepository.findByEmail(data.email);
        if(userInDB.Item){
            throw new UserAlreadyExists();
        }
        if(data.password !== data.password_check){
            throw new PasswordsDontMatch();
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        return await userRepository.createUser({
            email: data.email,
            name: data.name,
            surnames: data.surnames,
            password: hashedPassword,
        })     
    }

}


module.exports = new userService();
