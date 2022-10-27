const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");

const mockResponse = {
  Item: {
    ID: "10",
    DIRECCIO: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(estacionesRepository, "findById").mockImplementation((id) => {
    if (id == 10) {
      return mockResponse;
    } else return "1";
  });
});
afterEach(() => {
  jest.spyOn(estacionesRepository, "findById").mockRestore();
});

describe("Find estaciones by Id testing!", () => {
  test("Passarà ja que crida a la funció findById de estacionesRepository amb un id vàlid", () => {
    const input = 10;
    const output = {
      ID: "Hola",
      DIRECCIO: "C/Jordi Girona, 1-3",
    };
    const data = estacionesService.findById(input);
    console.log(data);
  });
});
