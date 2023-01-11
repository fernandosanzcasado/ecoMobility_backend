const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const ValoracionNotFoundError = require("../../../errors/valoraciones.errors/valoracionNotFound");
const ValoracionWrongAttrError = require("../../../errors/valoraciones.errors/valoracionWrongAttr");
const ValoracionNoContentError = require("../../../errors/valoraciones.errors/valoracionNoContent");

const valoracionesRepository = require("../repository/valoraciones.repository");

const estacionesService = require("../../estaciones/service/estaciones.service");
const userService = require("../../user/service/user.service");

class valoracionesService {
  async scanTable() {
    var data = await valoracionesRepository.scanTable();
    data = data.Items;
    return data;
  }

  async userVal(id) {
    const data = await valoracionesRepository.scanTable();
    const valUser = data.Items.filter(
      (valoracion) => valoracion.emailUser === id
    );
    if (Object.keys(valUser).length == 0) {
      throw new ValoracionNoContentError();
    }
    return valUser;
  }

  async estacionVal(id) {
    const data = await valoracionesRepository.scanTable();
    const valEstacion = data.Items.filter(
      (valoracion) => valoracion.idEstacion === id
    );
    if (Object.keys(valEstacion).length == 0) {
      throw new ValoracionNoContentError();
    }
    return valEstacion;
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
    await estacionesService.findById(data.idEstacion);
    val.id = uuidv4();
    const newValoracion = valoracionesRepository.postOrUpdateVal(val);
    return newValoracion;
  }

  async updateVal(id, valoracion) {
    const val = await this.infoVal(id);
    val.valoracion = valoracion;
    console.log(val);

    const newVal = await valoracionesRepository.postOrUpdateVal(val);
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
