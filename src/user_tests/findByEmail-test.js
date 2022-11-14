const userService = require("../../modules/estaciones/service/user.service");
const userRepository = require("../modules/user/repository/user.repository");

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

describe("findbyEmailfunctionextended", () => {
  test("Crida a  findBy Email", () => {
    const input = 10;
    const output = {
      ID: "10",
      ADREÇA: "P",
    };
    expect.assertions(1);
    userService
      .findByEmail(input)
      .then((returnData) => expect(returnData).toEqual(output));
  });
});

findByEmail - test.js;
