const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");

const mockResponse = {
  Item: {
    ID: "Hola",
    ADREÇA: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(estacionesRepository, "scanTable").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(estacionesRepository, "scanTable").mockRestore();
});

describe("Scan Table estaciones testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository", () => {
    estacionesService.scanTable();
    expect(estacionesRepository.scanTable).toHaveBeenCalled();
  });
});
