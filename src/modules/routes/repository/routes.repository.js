const db = require('../../../helpers/database');



class routesRepository{

    constructor(){
        this.tableName = 'Routes'
    }

    async createRoute(id, email, data){
        const params = {
            TableName: this.tableName,
                Item: {
                    id: id,
                    email: email,
                    initalLatitude: data.latIni,
                    initialLongitude: data.longIni,
                    endingLatitude: data.latEnd,
                    endingLongitude: data.longEnd,
                    vehicle: data.vehicle,
                    startingDate: Date.now(),
                    endingDate: null,
                    km: 0,
                    CO2: 0,
                }
            };
            return await db.put(params).promise();
    }

    async getRoute(id,email){
        const params = {
            TableName: this.tableName,
            Key: {
                id: id,
                email: email
            },
        };
        return await db.get(params).promise();
    }

    async updateRoute(id,email,data){
        const params = {
            TableName: this.tableName,
            Key: {
                id: id,
                email: email
            },
            ExpressionAttributeNames: {
                "#KM": "km",
                "#CO2": "CO2",
                "#ED": "endingDate" 
               }, 
               ExpressionAttributeValues: {
                ':km' : data.km,
                ':co2': data.CO2,
                ':ed': Date.now(),
              },
              UpdateExpression: "SET #KM = :km, #CO2 = :co2, #ED = :ed", 
        };
        await db.update(params).promise();
    }



}


module.exports = new routesRepository();