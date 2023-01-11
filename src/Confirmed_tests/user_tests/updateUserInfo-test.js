const userService = require("../modules/user/service/user.service");
const userRepository = require("../modules/user/repository/user.repository");

const mockResponse = {
  Item: {
    ID: "Hola",
    ADREÇA: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(userRepository, "updateUserInfo").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(userRepository, "updateUserInfo").mockRestore();
});

describe("UpdateUserInfo", () => {
  test("Crida a UpdateUserInfo", () => {
    userService.updateUserInfo();
    expect(userRepository.updateUserInfo()).toHaveBeenCalled();
  });
});
updateUserInfo - test.js;
