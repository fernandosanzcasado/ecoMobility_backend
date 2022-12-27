const bicingRepository = require("../repository/bicing.repository");
const EstacionNotFoundError = require("../../../errors/estaciones.errors/estacionNotFound");

class bicingService {
  async bicingAll() {
    const information = await bicingRepository.bicingInformation();
    const status = await bicingRepository.bicingStatus();
    return { information, status };
  }

  async bicingAllById(id) {
    const information = await bicingRepository.bicingInformationById(id);
    const status = await bicingRepository.bicingStatusById(id);
    return { information, status };
  }

  async bicingCoords() {
    const data = await bicingRepository.bicingInformation();
    console.log("hola");
    console.log(data.data);
    const coords = data.stations.map((s) => ({
      lat: s.lat,
      lon: s.lon,
    }));
    return coords;
  }

  async bicingCoordsById(id) {
    const data = await bicingRepository.bicingInformationById(id);
    return { lat: data.lat, lon: data.lon };
  }

  async bicingInfo() {
    const information = await bicingRepository.bicingInformation();
    const status = await bicingRepository.bicingStatus();
    return { information, status };
  }

  async bicingInfoById(id) {
    const information = await bicingRepository.bicingInformationById(id);
    const status = await bicingRepository.bicingStatusById(id);
    return { information, status };
  }

  async bicingCount() {
    const count = await bicingRepository.bicingCount();
    return { count };
  }
}

module.exports = new bicingService();
