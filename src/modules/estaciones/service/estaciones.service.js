const estacionesRepository = require("../repository/estaciones.repository");
const dist = require("./distancia");
const EstacionNotFoundError = require("../../../errors/estaciones.errors/estacionNotFound");

const { v4: uuidv4 } = require("uuid");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService {
  async scanTable(req) {
    var data = await estacionesRepository.scanTable();
    data = data.Items;
    if (Object.keys(data).length == 0) {
      throw new EstacionNotFoundError();
    } else {
      for (var param in req) {
        if (param == "potencia") {
          data = data.filter((d) => d.potencia <= req[param]);
        } else if (param == "tipoConexion") {
          data = data.filter((d) => d.tipoConexion == req[param]);
        } else if (param == "tipoCorriente") {
          data = data.filter((d) => d.tipoCorriente == req[param]);
        } else if (param == "tipoVehiculo") {
          data = data.filter((d) => d.tipoVehiculo == req[param]);
        } else if (param == "tipoVelocidad") {
          data = data.filter((d) => d.tipoVelocidad == req[param]);
        }
        // } else if (param == "distancia") {
        //   data = data.filter(
        //     (d) =>
        //       dist.distance(d.latitud, d.longitud, "USER POS") == req[param]
        //   );
        // }
      }
    }
    return data;
  }

  async getTableCoord() {
    const data = await estacionesRepository.getTableCoord();
    return data.Items;
  }

  async getTableDir() {
    const data = await estacionesRepository.getTableDir();
    return data.Items;
  }

  async findById(estacionId) {
    const data = await estacionesRepository.findById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async getCoordById(estacionId) {
    const data = await estacionesRepository.coordById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async getDirById(estacionId) {
    const data = await estacionesRepository.dirById(estacionId);
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
    const estacion = await estacionesRepository.findById(estacionID);
    if (!estacion.Item) {
      throw new EstacionNotFoundError();
    } else {
      Object.entries(data).forEach(([key, value]) => {
        estacion.Item[key] = value;
      });
    }
    const updatedEst = await estacionesRepository.postOrUpdateEstacion(
      estacion.Item
    );
    return updatedEst;
  }

  async deleteByID(estacionID) {
    const data = await estacionesRepository.deleteByID(estacionID);
    if (!data.Attributes) {
      throw new EstacionNotFoundError();
    } else return data.Attributes;
  }
}

module.exports = new estacionesService();
