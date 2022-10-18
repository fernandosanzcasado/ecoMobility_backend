const db = require('../../../helpers/database');
const  {v4: uuidv4} = require('uuid');


//fitxer que s'encarrega de gestionar operacions a la base de dades de la taula usuaris(ex:crear objectes, fer update dels objectes,
//borrar objectes o fer un get dels objectes).
class userRepository{

    constructor(){
        this.tableName = 'Usuarios'
    }

    async findById(userId){
        const params = {
            TableName: this.tableName,
            Key: {
                userId,
            },
        };
        return await db.get(params).promise();
    }

    async createUser(data){
        const params = {
            TableName: this.tableName,
            Item:{
                Id: uuidv4(),
                username: data.username,
                email: data.email,
                password: data.password,
            },
        };

        await db.put(params).promise();
        return params.Item;
    }

}

module.exports = new userRepository();