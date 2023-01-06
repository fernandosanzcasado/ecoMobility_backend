const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const ValoracionNotFoundError = require("../../../errors/estaciones.errors/valoracionNotFound");
const ValoracionWrongAttrError = require("../../../errors/estaciones.errors/valoracionWrongAttr");

const valoracionesRepository = require("../repository/estaciones.repository");

class valoracionesService {
  async scanTable() {
    var data = await valoracionesRepository.scanTable();
    data = data.Items;
    return data;
  }

  async userVal(id) {
    const data = await valoracionesRepository.scanTable();
    const valUser = data.Items.filter(valoracion => valoracion.gmailUser === id);
    return valUser;
  }

  async estacionVal(id) {
    const data = await valoracionesRepository.scanTable();
    const valEstacion = data.Items.filter(valoracion => valoracion.idEstacion === id);
    return valEstacion;
  }

  async infoVal(valoracionId) {
    const data = await valoracionesRepository.findById(valoracionId);
    if (!data.Item) {
      throw new ValoracionNotFoundError();
    } else return data.Item;
  }

  async postVal(data) {
    const valoracion = data;
    const attributes = ["gmailUser", "idEstacion", "val"];
    Object.entries(data).forEach(([key, value]) => {
        if (!attributes.includes(key)){
            throw new ValoracionWrongAttrError(key);
        }
    });
    valoracion.id = uuidv4();
    const newValoracion = valoracionesRepository.postOrUpdateVal(valoracion);
    return newValoracion;
  }

  async update(valoracionId, data) {
    const valoracion = await valoracionesRepository.infoVal(valoracionId);
    if (!valoracion.Item) {
      throw new ValoracionNotFoundError();
    } else {
      Object.entries(data).forEach(([key, value]) => {
        if (key in ["gmailUser", "idEstacion", "Val"]){
        valoracion.Item[key] = value;
        }
        else throw new ValoracionWrongAttrError(key);
      });
    }
    const newVal = await valoracionesRepository.postOrUpdateVal(
        valoracion.Item
    );
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
