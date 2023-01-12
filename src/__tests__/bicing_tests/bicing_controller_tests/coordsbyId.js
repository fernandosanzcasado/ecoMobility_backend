const bicingController = require("../../../modules/bicing/controller/bicing.controller");
const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingController", () => {
  beforeEach(() => {
    jest.spyOn(bicingService, "bicingInfo").mockImplementation(() => {
      return {
        information: {
          stations: [
            {
              id: 1,
              lat: 41.38,
              lon: 2.16,
              numBikesAvailable: 10,
              numDocksAvailable: 5,
            },
            {
              id: 2,
              lat: 41.39,
              lon: 2.17,
              numBikesAvailable: 7,
              numDocksAvailable: 8,
            },
          ],
        },
        status: {
          stations: [
            {
              id: 1,
              lat: 41.38,
              lon: 2.16,
              numBikesAvailable: 10,
              numDocksAvailable: 5,
            },
            {
              id: 2,
              lat: 41.39,
              lon: 2.17,
              numBikesAvailable: 7,
              numDocksAvailable: 8,
            },
          ],
        },
      };
    });
    jest.spyOn(bicingService, "bicingInfoById").mockImplementation((id) => {
      return {
        information: {
          id: id,
          lat: 41.38,
          lon: 2.16,
          numBikesAvailable: 10,
          numDocksAvailable: 5,
        },
        status: {
          id: id,
          lat: 41.38,
          lon: 2.16,
          numBikesAvailable: 10,
          numDocksAvailable: 5,
        },
      };
    });
    jest.spyOn(bicingService, "bicingCoords").mockImplementation(() => {
      return [
        {
          id: 1,
          lat: 41.38,
          lon: 2.16,
        },
        {
          id: 2,
          lat: 41.39,
          lon: 2.17,
        },
      ];
    });
    jest.spyOn(bicingService, "bicingCoordsById").mockImplementation((id) => {
      return {
        id: id,
        lat: 41.38,
        lon: 2.16,
      };
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("bicingCoordsById", () => {
    test("should return station coordinates by id in the expected format", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await bicingController.bicingCoordsById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        lat: 41.38,
        lon: 2.16,
      });
    });
  });
});
