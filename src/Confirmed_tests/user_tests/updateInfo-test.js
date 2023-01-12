const userService = require("../modules/user/service/user.service");
const userRepository = require("../modules/user/repository/user.repository");

const mockResponse = {
    Item: {
      email: "test@test.com",
      name: "Test",
      surnames: "Tests",
      password: "test1234",
      isSuperuser: false,
      dateJoined: 1669127051506,
    },
  };

beforeEach(() => {
  jest.spyOn(userRepository, "updateUserInfo").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(userRepository, "updateUserInfo").mockRestore();
});

describe("UpdateInfo", () => {
  test("Crida a UpdateInfo", () => {
    userService.updateInfo();
    expect(userRepository.updateUserInfo()).toHaveBeenCalled();
  });
});
updateInfo - test.js;




