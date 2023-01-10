const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const estacionesRepository = require("../repository/estaciones.repository");
const EstacionNotFoundError = require("../../../errors/estaciones.errors/estacionNotFound");
const EstacionNoContentError = require("../../../errors/estaciones.errors/estacionNoContent");
const EstacionWrongAttrError = require("../../../errors/estaciones.errors/estacionWrongAttr");
const EstacionFaltaLatCoordsError = require("../../../errors/estaciones.errors/estacionFaltaLatCoords");
const EstacionFaltaLongCoordsError = require("../../../errors/estaciones.errors/estacionFaltaLongCoords");
const jaccardIndex = require("../../../helpers/jaccard");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService {
  async scanTable(query) {
    var data = await estacionesRepository.scanTable();
    data = data.Items;
    for (var param in query) {
      if (param === "distancia") {
        if (!query.latitud) {
          throw new EstacionFaltaLatCoordsError();
        }
        if (!query.longitud) {
          throw new EstacionFaltaLongCoordsError();
        }
        data = data.filter(
          (d) =>
            distance(d.latitud, d.longitud, query["latitud"], query["longitud"]) <=
            query[param]
        );
        continue;
      }

      else if (param === "potencia") {
        data = data.filter((d) => 
          d[param] <= query[param]
        );
        continue;
      }

      else if (["tipoCorriente","tipoConexion", "tipoVelocidad", "tipoVehiculo"].includes(param)) {
        data = data.filter((d) => 
          jaccardIndex(d[param], query[param]) >= 0.4
        );
      }
      else throw new EstacionWrongAttrError(param);
    }
    if (Object.keys(data).length == 0) {
      throw new EstacionNoContentError();
    }

    return data;
  }

  async countEstaciones() {
    var data = await estacionesRepository.scanTable();
    data = data.Items;
    const count = Object.keys(data).length;
    return count;
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
    estacion.id = uuidv4();
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
    }
  }
}

function distance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
}

module.exports = new estacionesService();
