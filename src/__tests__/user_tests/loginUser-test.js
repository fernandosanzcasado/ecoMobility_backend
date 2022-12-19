const userService = require("../../modules/user/service/user.service");
const userRepository = require("../../modules/user/repository/user.repository");

const mockResponse = {
  Item: {
    email: "marc@gmail.com",
    password: "1111",
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
  test("Crida  User", () => {
    expect(input).toEqual(output);
    userService.loginUser();
    const email = "marc@gmail.com";
    const password = "1111";
    const input = checkEmail(email);
    const output = true;
    expect(userRepository.findByEmail()).toHaveBeenCalled();
  });
  test("Crida amb User erroni", () => {
    const email = "marc@gail.com";
    const password = "1111";
    userService.loginUser();
    expect(UserNotFoundError());
  });
  test("Crida amb User erroni", () => {
    const email = "mar";
    const password = "1111";
    userService.loginUser();
    expect(IncorrectPassword());
  });
});
loginUsertest - test.js;
