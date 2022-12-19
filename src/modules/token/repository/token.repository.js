const { json } = require('body-parser');


const db = require('../../../helpers/database');



class tokenRepository{

    constructor(){
        this.tableName = 'TokensForgottenPassword'
    }

    async findTokenByPK(token){
        const params = {
            TableName: this.tableName,
            Key: {
                token: token,
            },
        };
         return await db.get(params).promise();
    }
    
    async findEmailNonValidToken(email){
        const params = {
            TableName: this.tableName,
            IndexName: 'email-expirationDate-index',
            KeyConditionExpression: '#E = :e and #ED >= :ad',
            ExpressionAttributeNames: {
                "#E": 'email',
                '#ED': 'expirationDate'  
               },
            ExpressionAttributeValues: {
                ':e' : email,
                ':ad': Date.now()


            },
            ScanIndexForward: 'False',
            Limit: '1'
        };
        return await db.query(params).promise();
    }

    async createToken(data){
        const params = {
            TableName: this.tableName,
            Item: {
                token: data.token,
                email: data.email,
                creationDate: Date.now(),
                expirationDate: Date.now() + 14400000  
            },  
        };
       await db.put(params).promise();
       return data.token;       
}

async updateExpirationDate(token){
    const params = {
        ExpressionAttributeNames: {
            "#ED": "expirationDate", 
           }, 
           ExpressionAttributeValues: {
            ':ued' : Date.now(),
          }, 
           Key: {
            token: token
           }, 
           TableName: this.tableName, 
           UpdateExpression: "SET #ED = :ued",
    };
    await db.update(params).promise();



}


}

module.exports = new tokenRepository();