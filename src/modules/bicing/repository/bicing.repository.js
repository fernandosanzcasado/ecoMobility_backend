const axios = require("axios");

const BicingServerError = require("../../../errors/bicing.errors/BicingServerError");

const FIRST_URL =
  "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information";
const SECOND_URL =
  "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status/";

class bicingRepository {
  async bicingInformation() {
    console.log("repo");

    const data = await axios.get(FIRST_URL).catch((err) => {
      throw new BicingServerError(err.message);
    });
    console.log(data.data.data);
    return data.data.data;
  }

  async bicingStatus() {
    const data = await axios(FIRST_URL);
  }

  async bicingInformationById() {
    const data = await axios(FIRST_URL);
  }
}

module.exports = new bicingRepository();
