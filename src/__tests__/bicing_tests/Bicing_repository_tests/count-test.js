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
