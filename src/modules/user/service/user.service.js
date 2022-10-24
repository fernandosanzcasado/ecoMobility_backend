const { json } = require("body-parser");
const userRepository = require("../repository/user.repository");
const bcrypt = require('bcrypt')


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


    async loginUser(data){
        const user = await userRepository.findByEmail(data.email);
        
        if(!user.Item){
            return Promise.reject({ msg: 'User does not exist.'});
        }else if(user.Item.Password !== data.password){
            return Promise.reject({ msg: 'Incorrect Password.'});
        }else{
        return user;
        } 
    }

    async registerUser(data){
        console.log(data.password);
        this.hashPassword(data.password);
        
        
    }


    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        console.log(hash)
    }


    


    
}


module.exports = new userService();
