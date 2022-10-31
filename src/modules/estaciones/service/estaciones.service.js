const estacionesRepository = require("../repository/estaciones.repository");
const EstacionNotFoundError = require("../../../errors/estaciones.errors/estacionNotFound");

const { v4: uuidv4 } = require("uuid");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService {
  async scanTable() {
    const data = estacionesRepository.scanTable();
    return data.Items;
  }

  async getTableCoord() {
    const data = estacionesRepository.getTableCoord();
    return data.Items;
  }

  async getTableDir() {
    const data = estacionesRepository.getTableDir();
    return data.Items;
  }

  async findById(estacionId) {
    const data = estacionesRepository.findById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async getCoordById(estacionId) {
    const data = estacionesRepository.coordById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async getDirById(estacionId) {
    const data = estacionesRepository.dirById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async postEstacion(data) {
    const estacion = data;
    estacion.ID = uuidv4();
    const newEstacion = estacionesRepository.postOrUpdateEstacion(estacion);
    return newEstacion;
  }

  async update(estacionID, data) {
    const estacion = estacionesRepository.findById(estacionID);
    if (!estacion.Item) {
      throw new EstacionNotFoundError();
    } else {
      Object.entries(data).forEach(([key, value]) => {
        estacion.Item[key] = value;
      });
    }
    const updatedEst = estacionesRepository.postOrUpdateEstacion(estacion.Item);
    return updatedEst;
  }

  async deleteByID(estacionID) {
    const data = estacionesRepository.deleteByID(estacionID);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }
}

module.exports = new estacionesService();
