const bicingService = require("../service/bicing.service");

class bicingController {
  async bicingAll(req, res) {
    try {
      console.log("Fetching data from Bicing API...");
      const data = await bicingService.bicingInfo();

      console.log("Received data from Bicing API:", data);

      const stations = data.information.stations;
      console.log("Stations:", stations);

      // create a new array of objects with the desired information
      const cleanedData = stations.map((station) => {
        const status = data.status.stations.find((s) => s.id === station.id);
        return {
          id: status.id,
          num_bikes_available: status.num_bikes_available,
          num_bikes_available_types: status.num_bikes_available_types,
          num_docks_available: status.num_docks_available,
          Street: station.address,
          nseaters: station.slots,
          "Number of docks availabe": station.num_docks_available,
          coordinates: `(${station.lat}, ${station.lon})`,
          "Postal Code": station.post_code,
          "Total capacity": station.capacity,
          is_charging_station: status.is_charging_station,
        };
      });

      console.log("Cleaned data:", cleanedData);
      res.json(cleanedData);
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  }

  async bicingAllById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingInfoById(id);

      const station = data.information;
      const status = data.status;

      const responseData = {
        num_bikes_available: status.num_bikes_available,
        num_bikes_available_types: status.num_bikes_available_types,
        num_docks_available: status.num_docks_available,
        Street: station.address,
        nseaters: station.slots,
        go: station.nearby_distance,
        "Number of shits to leave the bikes": station._ride_code_support,
        coordinates: `(${station.lat}, ${station.lon})`,
        "Postal Code": station.post_code,
        "Total capacity": station.capacity,
        is_charging_station: status.is_charging_station,
      };

      res.json(responseData);
    } catch (err) {
      res.json(err);
    }
  }
  async bicingCoords(req, res) {
    try {
      const data = await bicingService.bicingCoords();
      const stations = data.information.stations;

      // create a new array of objects with the desired information
      const cleanedData = stations.map((station) => ({
        id: station.station_id,
        coordinates: `(${station.lat}, ${station.lon})`,
      }));

      res.json(cleanedData);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingCoordsById(req, res) {
    try {
      const id = req.params.id;
      const station = await bicingService.bicingCoordsById(id);

      const cleanedData = {
        id: station.station_id,
        coordinates: `(${station.lat}, ${station.lon})`,
      };

      res.json(cleanedData);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingInfo(req, res) {
    try {
      const data = await bicingService.bicingInfo();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingInfoById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingInfoById(id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingCount(req, res) {
    try {
      const data = await bicingService.bicingCount();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new bicingController();
