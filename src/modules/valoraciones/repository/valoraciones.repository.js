const db = require("../../../helpers/database");

class valoracionesRepository {
  constructor() {
    this.tableName = "Valoracion";
  }

  async scanTable() {
    const params = {
      TableName: this.tableName,
    };
    return await db.scan(params).promise();
  }

  async findById(id) {
    const params = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
    };
    return await db.get(params).promise();
  }

  async postOrUpdateVal(valoracion) {
    const params = {
      TableName: this.tableName,
      Item: valoracion,
    };
    await db.put(params).promise();
    return valoracion;
  }

  async deleteVal(valoracionID) {
    const params = {
      TableName: this.tableName,
      Key: {
        id: valoracionID,
      },
      ReturnValues: "ALL_OLD",
    };
    return await db.delete(params).promise();
  }
}

module.exports = new valoracionesRepository();
