const bicingService = require("../service/bicing.service");

class bicingController {
  async bicingAll(req, res) {
    try {
      console.log("Fetching data from Bicing API...");
      const data = await bicingService.bicingInfo();

      const infoStations = data.information.stations;
      const statusStations = data.status.stations;

      const mixedStations = infoStations.filter((infoItem) =>
        statusStations.some(
          (statusItem) => statusItem.station_id === infoItem.station_id
        )
      );

      const cleanedData = mixedStations.map((station) => {
        const info = infoStations.find(
          (s) => s.station_id === station.station_id
        );
        const status = statusStations.find(
          (s) => s.station_id === station.station_id
        );
        return {
          id: info.station_id, // use id from station object
          lat: info.lat, // latitude
          lon: info.lon, // longitude
          numBikesAvailable: status.num_bikes_available, // use num_bikes_available from status object
          numBikesAvailableTypes: status.num_bikes_available_types, // use num_bikes_available_types from status object
          status: status.status,
          numDocksAvailable: status.num_docks_available, // use num_docks_available from status object
          street: info.address, // use address from station object
          slots: info.slots, // use slots from station object
          postalCode: info.post_code, // use post_code from station object
          totalCapacity: info.capacity, // use capacity from station object
          isChargingInfo: status.is_charging_station, // use is_charging_station from status object
        };
      });

      res.status(200).json(cleanedData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async bicingAllById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingInfoById(id);

      const station = data.information;
      const status = data.status;

      const responseData = {
        id: station.station_id, // use id from station object
        lat: station.lat,
        lon: station.lon, // include latitude and longitude
        num_bikes_available: status.num_bikes_available,
        num_bikes_available_types: status.num_bikes_available_types,
        status: status.status,
        num_docks_available: status.num_docks_available,
        Street: station.address,
        slots: station.slots,
        numDocksAvailable: station._ride_code_support,
        PostalCode: station.post_code,
        capacity: station.capacity,
        is_charging_station: status.is_charging_station,
      };

      res.status(200).json(responseData);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async bicingCoords(req, res) {
    try {
      const data = await bicingService.bicingInfo();
      const stations = data.information.stations;

      // create a new array of objects with the desired information
      const cleanedData = stations.map((station) => ({
        id: station.station_id,
        lat: station.lat,
        lon: station.lon, // include latitude and longitude
      }));

      res.status(200).json(cleanedData);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async bicingCoordsById(req, res) {
    try {
      const station = await bicingService.bicingCoordsById(req.params.id);

      const cleanedData = {
        id: station.station_id,
        lat: station.lat,
        lon: station.lon, // include latitude and longitude`
      };

      res.status(200).json(cleanedData);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async bicingInfo(req, res) {
    try {
      const data = await bicingService.bicingInfo();

      // create a new array of objects with the desired information
      const cleanedData = data.information.stations.map((station) => {
        return {
          id: station.station_id,
          lat: station.lat,
          lon: station.lon, // include latitude and longitude
          // include latitude and longitude
          Street: station.address, // basic information
          PostalCode: station.post_code,
          slots: station.slots,
          numDocksAvailable: station._ride_code_support,
          PostalCode: station.post_code,
          capacity: station.capacity,
          num_bikes_available_types: status.num_bikes_available_types,
        };
      });

      res.status(200).json(cleanedData);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async bicingInfoById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingInfoById(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async bicingCount(req, res) {
    try {
      const data = await bicingService.bicingCount();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = new bicingController();
