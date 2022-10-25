const db = require("../../../helpers/database");

//fitxer que s'encarrega de gestionar operacions a la base de dades de la taula usuaris(ex:crear objectes, fer update dels objectes,
//borrar objectes o fer un get dels objectes).
class estacionesRepository {
  constructor() {
    this.tableName = "Estaciones_Vehiculos";
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
        "#ID": "ID",
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
        "#ID": "ID",
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
        ID: estacionID,
      },
    };
    return await db.get(params).promise();
  }

  async postOrUpdateEstacion(estacion) {
    const params = {
      TableName: this.tableName,
      Item: estacion,
    };
    await db.put(params).promise();
    return estacion;
  }

  async deleteByID(estacionID) {
    const params = {
      TableName: this.tableName,
      Key: {
        ID: estacionID,
      },
    };
    return await db.delete(params).promise();
  }
}

module.exports = new estacionesRepository();
