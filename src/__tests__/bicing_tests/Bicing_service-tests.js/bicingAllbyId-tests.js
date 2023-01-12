const bicingController = require("../../../modules/bicing/controller/bicing.controller");
const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingAllById", () => {
  test("should return the information and status of a station by its id", async () => {
    const id = 1;
    const information = {
      id: id,
      lat: 41.38,
      lon: 2.16,
      numBikesAvailable: 10,
      numDocksAvailable: 5,
    };
    const status = {
      id: id,
      lat: 41.38,
      lon: 2.16,
      numBikesAvailable: 10,
      numDocksAvailable: 5,
    };

    jest
      .spyOn(bicingRepository, "bicingInformationById")
      .mockImplementation((id) => {
        return information;
      });

    jest
      .spyOn(bicingRepository, "bicingStatusById")
      .mockImplementation((id) => {
        return status;
      });

    const result = await bicingService.bicingAllById(id);
    expect(result).toEqual({ information, status });
  });
});
