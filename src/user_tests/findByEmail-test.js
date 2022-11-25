const userService = require("../../modules/user/service/user.service");
const userRepository = require("../../modules/user/repository/user.repository");

const mockResponse = {
  Item: {
    ID: "Hola",
    ADREÇA: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(userRepository, "findByEmail").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(userRepository, "findByEmail").mockRestore();
});

describe("findbyEmail", () => {
  test("Crida a Repositori findBy Email", () => {
    userService.findByEmail();
    expect(userRepository.findByEmail()).toHaveBeenCalled();
  });
});
findByEmail - test.js;
