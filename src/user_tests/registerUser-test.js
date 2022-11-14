const mockResponse = {
  Item: {
    ID: "Hola",
    ADREÇA: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(userRepository, "loginUser").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(userRepository, "loginUser").mockRestore();
});

describe("registerUsertest", () => {
  test("Crida a findbyEmail", () => {
    userService.loginUser();
    expect(userRepository.findByEmail()).toHaveBeenCalled();
  });
});
registerUsertest - test.js;
