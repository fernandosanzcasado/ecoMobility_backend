const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const ValoracionNotFoundError = require("../../../errors/valoraciones.errors/valoracionNotFound");
const ValoracionWrongAttrError = require("../../../errors/valoraciones.errors/valoracionWrongAttr");
const ValoracionNoContentError = require("../../../errors/valoraciones.errors/valoracionNoContent");
const EstacionNoContentError = require("../../../errors/estaciones.errors/estacionNoContent");

const valoracionesRepository = require("../repository/valoraciones.repository");

const estacionesRepository = require("../../estaciones/repository/estaciones.repository");
const userService = require("../../user/service/user.service");
const bicingService = require("../../bicing/service/bicing.service");

class valoracionesService {
  async scanTable(query) {
    var data = await valoracionesRepository.scanTable();
    data = data.Items;
    for (var param in query) {
      if (param === "emailUser") {
        data = data.filter((d) => d.emailUser === query[param]);
        continue;
      } else if (param === "idEstacion") {
        data = data.filter((d) => d.idEstacion === query[param]);
        continue;
      }
    }
    if (Object.keys(data).length == 0) {
      throw new EstacionNoContentError();
    }
    return data;
  }

  async infoVal(valoracionId) {
    const data = await valoracionesRepository.findById(valoracionId);
    if (!data.Item) {
      throw new ValoracionNotFoundError();
    } else return data.Item;
  }

  async postVal(data) {
    const val = data;
    await userService.findByEmail(data.emailUser);
    const estacion = await estacionesRepository.findById(data.idEstacion);
    if (!estacion.Item) {
      await bicingService.bicingInfoById(data.idEstacion);
    }
    val.id = uuidv4();
    const newValoracion = valoracionesRepository.postOrUpdateVal(val);
    return newValoracion;
  }

  async updateVal(id, valoracion) {
    const val = await this.infoVal(id);
    val.valoracion = valoracion;
    const newVal = await valoracionesRepository.postOrUpdateVal(val);
    console.log(newVal);
    return newVal;
  }

  async deleteVal(valoracionId) {
    const data = await valoracionesRepository.deleteVal(valoracionId);
    if (!data.Attributes) {
      throw new ValoracionNotFoundError();
    }
  }
}

module.exports = new valoracionesService();
