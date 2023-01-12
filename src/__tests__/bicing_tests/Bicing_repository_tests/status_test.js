const bicingController = require("../../../modules/bicing/controller/bicing.controller");
const bicingService = require("../../../modules/bicing/service/bicing.service");
const bicingRepository = require("../../../modules/bicing/repository/bicing.repository");

describe("bicingStatus", () => {
  test("should return station status data", async () => {
    // Arrange
    const mockData = { data: { data: { some: "status data" } } };
    axios.get.mockImplementation(() => Promise.resolve(mockData));

    // Act
    const result = await bicingRepository.bicingStatus();

    // Assert
    expect(result).toEqual(mockData.data.data);
    expect(axios.get).toHaveBeenCalledWith(SECOND_URL);
  });

  test("should throw BicingServerError when axios fails", async () => {
    // Arrange
    const errorMessage = "Request failed with status code 404";
    axios.get.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    // Act and Assert
    await expect(bicingRepository.bicingStatus()).rejects.toThrow(
      BicingServerError
    );
    expect(axios.get).toHaveBeenCalledWith(SECOND_URL);
  });
});
