const bicingController = require("../../../modules/bicing/controller/bicing.controller");
const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingStatusById", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: {
            stations: [
              {
                station_id: 1,
                num_bikes_available: 10,
                num_docks_available: 5,
              },
              { station_id: 2, num_bikes_available: 5, num_docks_available: 8 },
            ],
          },
        },
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return the status of the station with the given id", async () => {
    const result = await bicingRepository.bicingStatusById(1);
    expect(result).toEqual({
      station_id: 1,
      num_bikes_available: 10,
      num_docks_available: 5,
    });
  });

  it("should throw an error when the station id is not found", async () => {
    try {
      await bicingRepository.bicingStatusById(3);
    } catch (err) {
      expect(err).toBeInstanceOf(EstacionNotFoundError);
    }
  });
});
