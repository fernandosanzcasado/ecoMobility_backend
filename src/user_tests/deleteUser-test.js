const userService = require("../../modules/user/service/user.service");
const userRepository = require("../../modules/user/repository/user.repository");

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
  jest.spyOn(userRepository, "deleteUserByEmail").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(userRepository, "deleteUserByEmail").mockRestore();
});

describe("deleteUser Tests!", () => {
  test("Crida a la funció deleteUserByEmail de Rep ", () => {
    userService.deleteUser();
    expect(userRepository.deleteUserByEmail()).toHaveBeenCalled();
  });
});
deleteUser - test.js;
