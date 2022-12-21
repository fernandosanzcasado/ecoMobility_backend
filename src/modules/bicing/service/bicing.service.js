const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const bicingRepository = require("../repository/bicing.repository");
const EstacionNotFoundError = require("../../../errors/estaciones.errors/estacionNotFound");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class bicingService {
  async bicingAll() {
    console.log("service");

    const dataInfo = await bicingRepository.bicingInformation();
    // const dataStatus = await bicingRepository.bicingStatus();
    return { data1: dataInfo }; //, data2: dataStatus };
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

module.exports = new bicingService();
