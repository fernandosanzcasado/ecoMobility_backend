const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");
const EstacionNotFoundError = require("../../errors/estaciones.errors/estacionNotFound");

const mockResponse = {
  Item: {
    ID: "10",
    DIRECCIO: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(estacionesRepository, "coordById").mockImplementation((id) => {
    if (id == 10) {
      return mockResponse;
    } else return "1";
  });
});
afterEach(() => {
  jest.spyOn(estacionesRepository, "coordById").mockRestore();
});

describe("Get coordenades de estació by Id testing!", () => {
  test("Passarà ja que crida a la funció coordById de estacionesRepository amb un id vàlid", () => {
    const input = 10;
    const output = {
      ID: "10",
      DIRECCIO: "C/Jordi Girona, 1-3",
    };
    expect.assertions(1);
    estacionesService
      .getCoordById(input)
      .then((returnData) => expect(returnData).toEqual(output));
  });

  test("Passarà ja que s'espera un error per cridar a la funció coordById de estacionesRepository amb un id invàlid", () => {
    const input = 15;
    expect.assertions(1);
    expect(estacionesService.getCoordById(input)).rejects.toThrow(
      new EstacionNotFoundError()
    );
  });
});
