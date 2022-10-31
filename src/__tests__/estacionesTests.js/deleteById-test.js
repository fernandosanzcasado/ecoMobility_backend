const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");
const EstacionNotFoundError = require("../../errors/estaciones.errors/estacionNotFound");

const mockResponse = {
  Item: {
    ID: "10",
    LATITUD: "23.89135485",
    LONGITUD: "81.68531686",
  },
};

beforeEach(() => {
  jest.spyOn(estacionesRepository, "deleteByID").mockImplementation((id) => {
    if (id == 10) {
      return mockResponse;
    } else return "false";
  });
});
afterEach(() => {
  jest.spyOn(estacionesRepository, "deleteByID").mockRestore();
});

describe("Delete estació by Id testing!", () => {
  test("Passarà amb éxit ja que crida a la funció deleteByID de estacionesRepository amb un id vàlid", () => {
    const input = 10;
    const output = {
      ID: "10",
      LATITUD: "23.89135485",
      LONGITUD: "81.68531686",
    };
    expect.assertions(1);
    estacionesService
      .deleteByID(input)
      .then((returnData) => expect(returnData).toEqual(output));
  });

  test("Passarà ja que s'espera un error per cridar a la funció deleteByID de estacionesRepository amb un id invàlid", () => {
    const input = 15;
    expect.assertions(1);
    expect(estacionesService.deleteByID(input)).rejects.toThrow(
      new EstacionNotFoundError()
    );
  });
});
