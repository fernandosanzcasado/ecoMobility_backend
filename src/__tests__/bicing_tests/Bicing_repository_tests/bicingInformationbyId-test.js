const bicingController = require("../../../modules/bicing/controller/bicing.controller");
const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingInformationById", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return {
        data: {
          data: {
            stations: [
              {
                station_id: 1,
                name: "Avenida Diagonal - Passeig de Gràcia",
                address: "Avenida Diagonal, Passeig de Gràcia",
                lat: 41.397952,
                lon: 2.159848,
              },
              {
                station_id: 2,
                name: "Rambla de Catalunya - Passeig de Gràcia",
                address: "Rambla de Catalunya, Passeig de Gràcia",
                lat: 41.391514,
                lon: 2.161796,
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

  test("should return information for the given station id", async () => {
    const id = 1;
    const expected = {
      station_id: 1,
      name: "Avenida Diagonal - Passeig de Gràcia",
      address: "Avenida Diagonal, Passeig de Gràcia",
      lat: 41.397952,
      lon: 2.159848,
    };
    const result = await bicingRepository.bicingInformationById(id);
    expect(result).toEqual(expected);
  });

  test("should throw an error if the station id does not exist", async () => {
    const id = 3;
    try {
      await bicingRepository.bicingInformationById(id);
      fail("An error was expected");
    } catch (err) {
      expect(err).toBeInstanceOf(EstacionNotFoundError);
      expect(err.message).toBe(`Station with id ${id} not found`);
    }
  });
});
