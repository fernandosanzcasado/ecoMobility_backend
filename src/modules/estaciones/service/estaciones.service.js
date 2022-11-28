const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const estacionesRepository = require("../repository/estaciones.repository");
const EstacionNotFoundError = require("../../../errors/estaciones.errors/estacionNotFound");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService {

  async scanTable(query, body) {
    var data = await estacionesRepository.scanTable();
    data = data.Items;
    if (Object.keys(data).length == 0) {
      throw new EstacionNotFoundError();
    } else {
      for (var param in query) {
        if (param == "potencia") {
          data = data.filter((d) => d.potencia <= query[param]);
        } else if (param == "tipoConexion") {
          data = data.filter((d) => d.tipoConexion == query[param]);
        } else if (param == "tipoCorriente") {
          data = data.filter((d) => d.tipoCorriente == query[param]);
        } else if (param == "tipoVehiculo") {
          data = data.filter((d) => d.tipoVehiculo == query[param]);
        } else if (param == "tipoVelocidad") {
          data = data.filter((d) => d.tipoVelocidad == query[param]);
        } else if (param == "distancia") {
          console.log(query[param]);
          data = data.filter(
            (d) =>
              distance(d.latitud, d.longitud, body.latitud, body.longitud) <=
              query[param]
          );
        }
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
  async scanTablealter() {
    const data = await estacionesRepository.scanTable();
    return data.Items;
  }

  //  function renameKey (Object, oldKey, newKey  ) {
  //    Object[newKey] = Object[oldKey];
  //    delete Object[oldKey];
  // }

  async canviatributs() {
    const data = await estacionesRepository.scanTable();
    data.forEach((item) => {
      for (let key in item) {
        if (key == "person") newKey = "nuevonombre";
        if (key == "TIPUS DE CORRENT") newKey = "tipusCorrent";
        if (key == "CODIMUN") newKey = "codiMunicipi";
        if (key == "ACCES") newKey = " acces";
        if (key == "TIPUS VEHICLE") newKey = "tipusVehicle";
        if (key == "ADREÇA") newKey = "adreca";
        if (key == "POTENCIA") newKey = "potencia";
        if (key == "CODIPROV") newKey = "codiProv";
        if (key == "Columna amb georeferència") newKey = "georef";
        if (key == "PROMOTOR-GESTOR") newKey = "promotor";
        if (key == "MUNICIPI") newKey = "municipi";
        if (key == "PROVINCIA") newKey = "provincia";
        if (key == "NPLACES ESTACIÓ") newKey = "nPlaces";
        if (key == "INDENTIFICADOR") newKey = "identificador";
        if (key == "LONGITUD") newKey = "longitud";
        if (key == "DESIGNACIÓ-DESCRIPTIVA") newKey = "desigDescriptiva";
        if (key == "id") newKey = "id";
        if (key == "TIPUS VELOCITAT") newKey = "tipusVelocitat";
        if (key == "TIPUS CONNEXIÓ") newKey = "tipusConnexio";
        if (key == "LATITUD") newKey = "latitud";
        renameKey(Object, key, newKey);
        Object[newKey] = Object[oldKey];
        // delete Object[oldKey];
      }
    });
  }

  async bicing(url) {
    let data = await axios(url);
    return data.data.data.stations;
  }

  async bicing_segundo(url_segundo) {
    let data_segundo = await axios(url_segundo);
    return data_segundo.data.data.stations;
  }
  async bicing_tercero(url_tercero) {
    let data_tercero = await axios(url_tercero);
    return data_tercero.data.data.stations;
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
    console.log(dist);
    return dist;
  }
}

module.exports = new estacionesService();
