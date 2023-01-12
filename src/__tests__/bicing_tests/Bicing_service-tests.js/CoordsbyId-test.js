describe("bicingCoordsById", () => {
  test("should return coord of station by id in the expected format", async () => {
    const station = {
      id: 1,
      lat: 41.38,
      lon: 2.16,
    };
    jest
      .spyOn(bicingRepository, "bicingInformationById")
      .mockImplementation(() => {
        return station;
      });
    const coord = await bicingService.bicingCoordsById(1);
    expect(coord).toEqual({ id: 1, lat: 41.38, lon: 2.16 });
  });
});
