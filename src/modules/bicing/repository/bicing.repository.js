const axios = require("axios");

const BicingServerError = require("../../../errors/bicing.errors/BicingServerError");
const EstacionNotFoundError = require("../../../errors/bicing.errors/EstacionNotFoundError");

const FIRST_URL =
  "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information";
const SECOND_URL =
  "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status/";

class bicingRepository {
  async bicingInformation() {
    const data = await axios.get(FIRST_URL).catch((err) => {
      throw new BicingServerError(err.message);
    });
    return data.data.data;
  }

  async bicingStatus() {
    const data = await axios.get(SECOND_URL).catch((err) => {
      throw new BicingServerError(err.message);
    });
    return data.data.data;
  }

  async bicingInformationById(id) {
    const data = await axios.get(FIRST_URL).catch((err) => {
      throw new BicingServerError(err.message);
    });
    console.log(id);
    const matchingStations = data.data.data.filter((s) => s.station_id === id);
    const station = matchingStations[0];
    console.log(station);

    if (!station) {
      throw new EstacionNotFoundError(`Station with id ${id} not found`);
    }
    return station;
  }

  async bicingStatusById(id) {
    const data = await axios.get(SECOND_URL).catch((err) => {
      throw new BicingServerError(err.message);
    });
    const station = data.data.data.stations.find((s) => s.station_id === id);
    if (!station) {
      throw new EstacionNotFoundError(`Station with id ${id} not found`);
    }
    return station;
  }

  async bicingCount() {
    const data = await axios.get(FIRST_URL).catch((err) => {
      throw new BicingServerError(err.message);
    });
    console.log("AQUI");
    console.log(data.data.data.stations.length);
    return data.data.data.stations.length;
  }
}

module.exports = new bicingRepository();
