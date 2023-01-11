const bicingController = require("../../../modules/bicing/controller/bicing.controller");
const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingService", () => {
  let bicingRepositoryMock;
  beforeEach(() => {
    bicingRepositoryMock = {
      getAllStations: jest.fn(),
      getStationById: jest.fn(),
      getAllStationCoords: jest.fn(),
      getStationCoordsById: jest.fn(),
    };
  });

  describe("getAllStations", () => {
    test("should call bicingRepository.getAllStations and return the result", async () => {
      const expectedResult = [
        {
          id: 1,
          lat: 41.38,
          lon: 2.16,
          numBikesAvailable: 10,
          numDocksAvailable: 5,
        },
      ];
      bicingRepositoryMock.getAllStations.mockResolvedValue(expectedResult);
      const service = new BicingService(bicingRepositoryMock);

      const result = await service.getAllStations();

      expect(bicingRepositoryMock.getAllStations).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
