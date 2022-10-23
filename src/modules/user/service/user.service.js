const userRepository = require("../repository/user.repository");

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
}


module.exports = new userService();
