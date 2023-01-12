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
                email:email,
            },
        };
        return await db.get(params).promise();
    }

    async createUser(data){
            const params = {
                TableName: this.tableName,
                ConditionExpression: "attribute_not_exists(Email)",
                Item: {
                    email: data.email,
                    name: data.name,
                    surnames: data.surnames,
                    password: data.password,
                    dateJoined: Date.now(),
                    isSuperuser: false,
                    isBlocked: false,
                    achievements: data.achievements,
                    profileImagePath: null,
                    object: '#USER'
                },    
            };

           await db.put(params).promise();
           return data;       
    }


    async updateUserInfo(email,data){
        const params = {
            ExpressionAttributeNames: {
                "#UN": "name", 
                "#US": "surnames"
               }, 
               ExpressionAttributeValues: {
                ':n' : data.name,
                ':s' : data.surnames,
              }, 
               Key: {
                email: email
               }, 
               TableName: this.tableName, 
               UpdateExpression: "SET #UN = :n, #US = :s",
               ReturnValues: "ALL_NEW", 
        };
        return await db.update(params).promise();
    }

    async uploadProfileImage(email, path){
        const params = {
            ExpressionAttributeNames: {
                "#UP": "profileImagePath", 
               }, 
               ExpressionAttributeValues: {
                ':p' : path,
              }, 
               Key: {
                email: email
               }, 
               TableName: this.tableName, 
               UpdateExpression: "SET #UP = :p", 
        };
        return await db.update(params).promise();


    }

    async updateUser(email,data){
        const params = {
            ExpressionAttributeNames: {
                "#UN": "name",
                "#US": "surnames",
                "#UIS": "isSuperuser",
                "#UIB": "isBlocked",
               }, 
               ExpressionAttributeValues: {
                ':n' : data.name,
                ':sn' : data.surnames,
                ':is' : data.isSuperuser,
                ':ib': data.isBlocked,
              }, 
               Key: {
                email: email
               }, 
               TableName: this.tableName, 
               UpdateExpression: "SET #UN = :n, #US = :sn, #UIS = :is, #UIB = :ib",
               ReturnValues: "ALL_NEW", 
        };
        return await db.update(params).promise();
    }

    async updatePassword(email, hashedPassword){
        const params = {
            ExpressionAttributeNames: {
                "#P": "password", 
               }, 
               ExpressionAttributeValues: {
                ':p' : hashedPassword,
              }, 
               Key: {
                email: email
               }, 
               TableName: this.tableName, 
               UpdateExpression: "SET #P = :p",
        };
        return await db.update(params).promise();

    }

    async deleteUserByEmail(email){
        const params = {
            TableName: this.tableName,
            Key: {
                email : email
            },
            ReturnValues: "ALL_OLD",
        };
        return await db.delete(params).promise();
    }

    async getAllUsers(){
        const params = {
            TableName: this.tableName,
        }
        return await db.scan(params).promise();
    }


    async updateExponentPushToken(email,exponentPushToken){
        const params = {
            TableName: this.tableName,
            Key: {
                email: email
            },
            ExpressionAttributeNames: {
                "#EPT": "exponentPushToken" 
               }, 
               ExpressionAttributeValues: {
                ':ept': exponentPushToken,
              },
              UpdateExpression: "SET #EPT = :ept", 
        };
        await db.update(params).promise();
    }

    async getUsersExponentPushToken(){
        const params = {
            TableName: this.tableName,
            ProjectionExpression: "exponentPushToken"
        }
        return await db.scan(params).promise();
    }

    async getRanking(){
        const params = {
            TableName: this.tableName,
            IndexName: 'object-ecoPoints-index',
            KeyConditionExpression: '#O = :o',
            ExpressionAttributeNames: {
                "#O": 'object',  
               },
            ExpressionAttributeValues: {
                ':o' : '#USER',
            },
            ScanIndexForward: 'False',
        }
        return await db.query(params).promise();
    }

}

module.exports = new userRepository();
