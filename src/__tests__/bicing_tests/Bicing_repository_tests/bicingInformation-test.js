const bicingRepository = require("../repository/bicing.repository");
const axios = require("axios");

describe("bicingInformation", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return {
        data: {
          data: {
            stations: [
              {
                station_id: 1,
                name: "Test Station 1",
                lat: 41.38,
                lon: 2.16,
                num_bikes_available: 10,
                num_docks_available: 5,
              },
              {
                station_id: 2,
                name: "Test Station 2",
                lat: 41.39,
                lon: 2.17,
                num_bikes_available: 7,
                num_docks_available: 8,
              },
            ],
          },
        },
      };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return all stations in the expected format", async () => {
    const data = await bicingRepository.bicingInformation();
    expect(data).toEqual({
      stations: [
        {
          station_id: 1,
          name: "Test Station 1",
          lat: 41.38,
          lon: 2.16,
          num_bikes_available: 10,
          num_docks_available: 5,
        },
        {
          station_id: 2,
          name: "Test Station 2",
          lat: 41.39,
          lon: 2.17,
          num_bikes_available: 7,
          num_docks_available: 8,
        },
      ],
    });
  });
});
