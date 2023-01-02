const bicingService = require("../service/bicing.service");

class bicingController {

  *swagger
  */bicing/all:
  *  get:
  *    summary: Get information for all Bicing stations
  *    description: Returns an array of objects with information about all Bicing stations
  *    responses:
  *      '200':
  *        description: A successful response
  *        content:
  *          application/json:
  *            schema:
  *              type: array
  *              items:
  *                type: object
  *                properties:
  *                  id:
  *                    type: integer
  *                    description: The ID of the Bicing station
  *                  coordinates:
  *                    type: string
  *                    description: The latitude and longitude of the Bicing station
  *                  num_bikes_available:
  *                    type: integer
  *                    description: The number of bikes available at the Bicing station
  *                  num_bikes_available_types:
  *                    type: object
  *                    description: The number of bikes available at the Bicing station, broken down by type
  *                  num_docks_available:
  *                    type: integer
  *                    description: The number of docks available at the Bicing station
  *                  Street:
  *                    type: string
  *                    description: The street address of the Bicing station
  *                  nseaters:
  *                    type: integer
  *                    description: The number of seats available at the Bicing station
  *                  'Number of docks available':
  *                    type: integer
  *                    description: The number of docks available at the Bicing station
  *                  'Postal Code':
  *                    type: string
  *                    description: The postal code of the Bicing station
  *                  'Total capacity':
  *                    type: integer
  *                    description: The total capacity of the Bicing station
  *                  is_charging_station:
  *                    type: boolean
  *                    description: Whether the Bicing station is a charging station
  async bicingAll(req, res) {
    try {
      console.log("Fetching data from Bicing API...");
      const data = await bicingService.bicingInfo();


      const stations = data.information.stations;

      const cleanedData = stations.map((station) => {
        console.log(station.id);
        const status = data.status.stations.find((s) => s.id === station.id);
        return {
          id: station.id, // use id from station object
          coordinates: `(${station.lat}, ${station.lon})`, // include latitude and longitude
          num_bikes_available: status.num_bikes_available, // use num_bikes_available from status object
          num_bikes_available_types: status.num_bikes_available_types, // use num_bikes_available_types from status object
          num_docks_available: status.num_docks_available, // use num_docks_available from status object
          Street: station.address, // use address from station object
          nseaters: station.slots, // use slots from station object
          "Number of docks availabe": status.num_docks_available, // use num_docks_available from station object
          "Postal Code": station.post_code, // use post_code from station object
          "Total capacity": station.capacity, // use capacity from station object
          is_charging_station: status.is_charging_station, // use is_charging_station from status object
        };
      });

      console.log("Cleaned data:", cleanedData);
      res.json(cleanedData);
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  }
  

  /bicing/{id}:
    get:
      summary: Get information for a specific Bicing station
      description: Returns an object with information about a specific Bicing station
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            minimum: 1
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  coordinates:
                    type: string
                    description: The latitude and longitude of the Bicing station
                  num_bikes_available:
                    type: integer
                    description: The number of bikes available at the Bicing station
                  num_bikes_available_types:
                    type: object
                    description: The number of bikes available at the Bicing station, broken down by type
                  num_docks_available:
                    type: integer
                    description: The number of docks available at the Bicing station
                  Street:
                    type: string
                    description: The street address of the Bicing station
                  nseaters:
                    type: integer
                    description: The number of seats available at the Bicing station
                  go:
                    type: integer
                    description: The distance to the nearest station
  /bicing/coords:
    get:
      summary: Get the coordinates for all Bicing stations
      description: Returns an array of objects with the ID and coordinates for all Bicing stations
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                      description: The ID of the Bicing station
                    coordinates:
                      type: string
                      description: The latitude and longitude of the Bicing station
      security:
        - apiKeyAuth: []

  /bicing/{id}/coords:
    get:
      summary: Get the coordinates for a specific Bicing station
      description: Returns an object with the ID and coordinates for a specific Bicing station
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            minimum: 1
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    description: The ID of the Bicing station
                  coordinates:
                    type: string
                    description: The latitude and longitude of the Bicing station
      security:
        - apiKeyAuth: []
  async bicingAllById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingInfoById(id);

      const station = data.information;
      const status = data.status;

      const responseData = {
        coordinates: `(${station.lat}, ${station.lon})`, // include latitude and longitude
        num_bikes_available: status.num_bikes_available,
        num_bikes_available_types: status.num_bikes_available_types,
        num_docks_available: status.num_docks_available,
        Street: station.address,
        nseaters: station.slots,
        go: station.nearby_distance,
        "Number of docks availabe": station._ride_code_support,
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

  /bicing/info:
    get:
      summary: Get information for all Bicing stations
      description: Returns an array of objects with information about all Bicing stations
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                      description: The ID of the Bicing station
                    coordinates:
                      type: string
                      description: The latitude and longitude of the Bicing station
                    num_bikes_available:
                      type: integer
                      description: The number of bikes available at the Bicing station
                    num_bikes_available_types:
                      type: object
                      description: The number of bikes available at the Bicing station, broken down by type
                    num_docks_available:
                      type: integer
                      description: The number of docks available at the Bicing station
                    Street:
                      type: string
                      description: The street address of the Bicing station
                    nseaters:
                      type: integer
                      description: The number of seats available at the Bicing station
                    'Number of docks available':
                      type: integer
                      description: The number of docks available at the Bicing station
                    'Postal Code':
                      type: string
                      description: The postal code of the Bicing station
                    'Total capacity':
                      type: integer
                      description: The total capacity of the Bicing station
                    is_charging_station:
                      type: boolean
                      description: Whether the Bicing station is a charging station
      security:
        - apiKeyAuth: []
  async bicingCoords(req, res) {
    try {
      const data = await bicingService.bicingInfo();
      const stations = data.information.stations;
      console.log("Stations:", stations);

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
  
  /bicing/{id}:
    get:
      summary: Get information for a specific Bicing station
      description: Returns an object with information about a specific Bicing station
        parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            minimum: 1
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  coordinates:
                    type: string
                    description: The latitude and longitude of the Bicing station
                  num_bikes_available:
                    type: integer
                    description: The number of bikes available at the Bicing station
                  num_bikes_available_types:
                    type: object
                    description: The number of bikes available at the Bicing station, broken down by type
                  num_docks_available:
                    type: integer
                    description: The number of docks available at the Bicing station
                  Street:
                    type: string
                    description: The street address of the Bicing station
                  nseaters:
                    type: integer
                    description: The number of seats available at the Bicing station
                  go:
                    type: integer
                    description: The distance to the nearest station
                  'Number of docks available':
                    type: integer
                    description: The number of docks available at the Bicing station
                  coordinates:
                    type: string
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

      // create a new array of objects with the desired information
      const cleanedData = data.information.stations.map((station) => {
        return {
          id: station.id,
          coordinates: `(${station.lat}, ${station.lon})`, // include latitude and longitude
          Street: station.address, // basic information
          "Postal Code": station.post_code,
        };
      });

      res.json(cleanedData);
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
