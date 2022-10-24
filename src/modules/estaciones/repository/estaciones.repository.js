const db = require('../../../helpers/database');


//fitxer que s'encarrega de gestionar operacions a la base de dades de la taula usuaris(ex:crear objectes, fer update dels objectes,
//borrar objectes o fer un get dels objectes).
class estacionesRepository{

    constructor(){
        this.tableName = 'Estaciones_Vehiculos'
    }

    async scanTable() {
        const params = {
            TableName: this.tableName,
        };
        return await db.scan(params).promise();
    }

    async getTableCoord() {
        const params = {
            ExpressionAttributeNames: {
                "#LAT": "LATITUD", 
                "#LONG": "LONGITUD",
                "#ID": "ID"
            }, 
            ProjectionExpression: "#ID, #LAT, #LONG", 
            TableName: this.tableName,
        };
        return await db.scan(params).promise();
    }

    async getTableDir() {
        const params = {
            ExpressionAttributeNames: {
                "#DIR": "ADREÇA", 
                "#ID": "ID"
            }, 
            ProjectionExpression: "#ID, #DIR", 
            TableName: this.tableName,
        };
        return await db.scan(params).promise();
    }

    async findById(estacionID) {
        const params = {
            TableName: this.tableName,
            Key: {
                ID:estacionID,
            },
        };
        console.log(estacionID)
        return await db.get(params).promise();
    }

    async addOrUpdateCharacter(character) {
        const params = {
            TableName: this.tableName,
            Item: character,
        };
        return await db.put(params).promise();
    };

    /*async createEstacion(data){
        const params = {
            TableName: this.tableName,
            Item:{
                ID: uuidv4(),
                ACCES: data.ACCES,
                ADREÇA: data.ADREÇA,
                CODIPROV: data.CODIPROV,
                Columna_amb_georeferencia: data.COLUMNA_AMB_GEOREFERENCIA,
                DESIGNACIO_DESCRIPTIVA: data.DESIGNACIO_DESCRIPTIVA,
                INDENTIFICADOR: data.INDENTIFICADOR,
                LATITUD: data.LATITUD,
                LONGITUD: data.LONGITUD,
                MUNICIPI: data.MUNICIPI,
                NPLACES_ESTACIO: data.NPLACES_ESTACIO,
                POTENCIA: data.POTENCIA,
                PROMOTOR_GESTOR: data.PROMOTOR_GESTOR,
                PROVINCIA: data.PROVINCIA,
                TIPUS_CONNEXIO: data.TIPUS_CONNEXIO,
                TIPUS_DE_CORRENT: data.TIPUS_DE_CORRENT,
                TIPUS_VEHICLE: data.TIPUS_VEHICLE,
                TIPUS_VELOCITAT: data.TIPUS_VELOCITAT
            },
        };

        await db.put(params).promise();
        return params.Item;
    }*/

    

    async deleteByID(estacionID) {
        const params = {
            TableName: this.tableName,
            Key: {
                ID:estacionID,
            },
        };
        return await db.delete(params).promise();
    }

}

module.exports = new estacionesRepository();