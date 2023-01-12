const bicingController = require("../../../modules/bicing/controller/bicing.controller");
const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingCount", () => {
  test("should return the count of stations", async () => {
    const count = 4;
    jest.spyOn(bicingRepository, "bicingCount").mockImplementation(() => {
      return count;
    });
    const result = await bicingRepository.bicingCount();
    expect(result).toEqual(count);
  });
});
