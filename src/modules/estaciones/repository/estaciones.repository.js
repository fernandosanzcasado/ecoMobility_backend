const db = require("../../../helpers/database");

//fitxer que s'encarrega de gestionar operacions a la base de dades de la taula usuaris(ex:crear objectes, fer update dels objectes,
//borrar objectes o fer un get dels objectes).
class estacionesRepository {
  constructor() {
    this.tableName = "EstacionesVehiculos";
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
        "#LAT": "latitud",
        "#LONG": "longitud",
        "#ID": "id",
      },
      ProjectionExpression: "#ID, #LAT, #LONG",
      TableName: this.tableName,
    };
    return await db.scan(params).promise();
  }

  async getTableDir() {
    const params = {
      ExpressionAttributeNames: {
        "#DIR": "direccion",
        "#ID": "id",
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
        id: estacionID,
      },
    };
    return await db.get(params).promise();
  }

  async coordById(estacionID) {
    const params = {
      ExpressionAttributeNames: {
        "#LAT": "latitud",
        "#LONG": "longitud",
        "#ID": "id",
      },
      ProjectionExpression: "#ID, #LAT, #LONG",
      TableName: this.tableName,
      Key: {
        id: estacionID,
      },
    };
    return await db.get(params).promise();
  }

  async dirById(estacionID) {
    const params = {
      ExpressionAttributeNames: {
        "#DIR": "direccion",
        "#ID": "id",
      },
      ProjectionExpression: "#ID, #DIR",
      TableName: this.tableName,
      Key: {
        id: estacionID,
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
        id: estacionID,
      },
      ReturnValues: "ALL_OLD",
    };
    return await db.delete(params).promise();
  }
}

module.exports = new estacionesRepository();
