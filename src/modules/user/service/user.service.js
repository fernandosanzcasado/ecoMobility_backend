const { json } = require("body-parser");
const userRepository = require("../repository/user.repository");
const bcrypt = require('bcrypt')

const UserNotFoundError = require("../../../errors/user.errors/userNotFound");
const IncorrectPassword = require("../../../errors/user.errors/incorrectPassword");
const UserAlreadyExists = require("../../../errors/user.errors/userAlreadyExists");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class userService{


    async findByEmail(email){
        const user = await userRepository.findByEmail(email);

        if(!user.Item){
            throw new UserNotFoundError();
         }else{
         return user.Item;
         } 
  }


    async create(data){
        
         const newUser =  await userRepository.createUser({
            email: data.email,
            name: data.name,
            surnames: data.surnames,
            password: data.password,
        });
        return newUser;
    }

    async updateUserInfo(email,data){
        const user = await userRepository.findByEmail(email);
        if(!user.Item){
            throw new UserNotFoundError();
        }
        return await userRepository.updateUserInfo(email,data);
    }

    async deleteByEmail(email){

        const deletedUser =  await userRepository.deleteUserByEmail(email);
        if(!deletedUser.Attributes){
            throw new UserNotFoundError();
        }
        console.log(deletedUser.Attributes);
        return deletedUser.Attributes;
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
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const newUser =  await userRepository.createUser({
            email: data.email,
            name: data.name,
            surnames: data.surnames,
            password: hashedPassword,
        }) 
        return newUser;    
    }

}


module.exports = new userService();
