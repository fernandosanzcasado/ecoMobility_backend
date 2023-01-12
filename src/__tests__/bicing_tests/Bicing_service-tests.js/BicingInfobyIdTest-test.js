const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingInfoById", () => {
  beforeEach(() => {
    jest
      .spyOn(bicingRepository, "bicingInformationById")
      .mockImplementation((id) => {
        return {
          id: id,
          lat: 41.38,
          lon: 2.16,
          numBikesAvailable: 10,
          numDocksAvailable: 5,
        };
      });
    jest
      .spyOn(bicingRepository, "bicingStatusById")
      .mockImplementation((id) => {
        return {
          id: id,
          lat: 41.38,
          lon: 2.16,
          numBikesAvailable: 2,
          numDocksAvailable: 8,
        };
      });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should return information and status by station id", async () => {
    const stationId = 1;
    const expectedResult = {
      information: {
        id: stationId,
        lat: 41.38,
        lon: 2.16,
        numBikesAvailable: 10,
        numDocksAvailable: 5,
      },
      status: {
        id: stationId,
        lat: 41.38,
        lon: 2.16,
        numBikesAvailable: 2,
        numDocksAvailable: 8,
      },
    };
    const result = await bicingService.bicingInfoById(stationId);
    expect(result).toEqual(expectedResult);
  });
});
