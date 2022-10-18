const userRepository = require('../repository/user.repository');

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class userService{

    async findById(userId){
        const data = await userRepository.findById(userId);

        if(data){
            return data.Item;
        }
        return data;
    }

    async create(data){
        return await userRepository.createUser({
            username: data.username,
            email: data.email,
            password: data.password,
        });
    }

}

module.exports = new userService();