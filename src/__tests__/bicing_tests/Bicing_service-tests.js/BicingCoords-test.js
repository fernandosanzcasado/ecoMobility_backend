describe("bicingCoords", () => {
  test("should return the coordinates of all stations", async () => {
    // Set up a mock implementation of the `bicingInformation` method in the repository
    jest.spyOn(bicingRepository, "bicingInformation").mockImplementation(() => {
      return {
        stations: [
          {
            station_id: 1,
            lat: 41.38,
            lon: 2.16,
          },
          {
            station_id: 2,
            lat: 41.39,
            lon: 2.17,
          },
        ],
      };
    });
    const coords = await bicingService.bicingCoords();
    expect(coords).toEqual([
      { lat: 41.38, lon: 2.16 },
      { lat: 41.39, lon: 2.17 },
    ]);
  });
});
