const userService = require("../../modules/user/service/user.service");
const userRepository = require("../../modules/user/repository/user.repository");

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

describe("loginUser test", () => {
  test("Crida a findbyEmail", () => {
    userService.loginUser();
    expect(userRepository.findByEmail()).toHaveBeenCalled();
  });
  test("Crida sense User () => {
    userService.loginUser();
    expect(userRepository.findByEmail()).toHaveBeenCalled();
  });
  test("Crida amb User", () => {
    userService.loginUser();
    expect(userRepository.findByEmail()).toHaveBeenCalled();
  });
});
loginUsertest - test.js;
