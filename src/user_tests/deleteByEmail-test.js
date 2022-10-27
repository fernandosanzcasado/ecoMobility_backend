const userService = require("../../modules/estaciones/service/user.service");
const userRepository = require("../modules/user/repository/user.repository");

const mockResponse = {
  Item: {
    ID: "Hola",
    ADREÇA: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(userRepository, "deleteUserByEmail").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(userRepository, "deleteUserByEmail").mockRestore();
});

describe("deletebyEmail Tests!", () => {
  test("Crida a la funció deleteUserByEmail de Rep ", () => {
    userService.deleteByEmail();
    expect(userRepository.deleteUserByEmail()).toHaveBeenCalled();
  });
});
deleteUserByEmail - test.js;
