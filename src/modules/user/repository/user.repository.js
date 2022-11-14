const db = require('../../../helpers/database');
const { json } = require('body-parser');

//fitxer que s'encarrega de gestionar operacions a la base de dades de la taula usuaris(ex:crear objectes, fer update dels objectes,
//borrar objectes o fer un get dels objectes).
class userRepository{

    constructor(){
        this.tableName = 'Users'
    }

    async findByEmail(email) {

        const params = {
            TableName: this.tableName,
            Key: {
                Email:email,
            },
        };
        return await db.get(params).promise();
    }

    async createUser(data){
            const params = {
                TableName: this.tableName,
                ConditionExpression: "attribute_not_exists(Email)",
                Item: {
                    Email: data.email,
                    Name: data.name,
                    Surnames: data.surnames,
                    Password: data.password,
                    Date_joined: Date.now(),
                    Is_superuser: false,
                },
            };

           return await db.put(params).promise();       
    }


    async updateUserInfo(email,data){
        const params = {
            ExpressionAttributeNames: {
                "#UN": "Name", 
                "#US": "Surnames"
               }, 
               ExpressionAttributeValues: {
                ':n' : data.name,
                ':s' : data.surnames,
              }, 
               Key: {
                Email: email
               }, 
               TableName: this.tableName, 
               UpdateExpression: "SET #UN = :n, #US = :s",
               ReturnValues: "ALL_NEW", 
        };
        return await db.update(params).promise();
    }

    async deleteUserByEmail(email){
        const params = {
            TableName: this.tableName,
            Key: {
                Email : email
            },
            ReturnValues: "ALL_OLD",
        };
        return await db.delete(params).promise();
    }


}

module.exports = new userRepository();
