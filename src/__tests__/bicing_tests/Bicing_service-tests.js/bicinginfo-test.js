describe("bicingInfo", () => {
  test("should return bicing information in the expected format", async () => {
    const information = {
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
    };
    const status = {
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
    };
    jest.spyOn(bicingRepository, "bicingInformation").mockImplementation(() => {
      return information;
    });
    jest.spyOn(bicingRepository, "bicingStatus").mockImplementation(() => {
      return status;
    });
    const bicingInfo = await bicingService.bicingInfo();
    expect(bicingInfo).toEqual({ information, status });
  });
});
