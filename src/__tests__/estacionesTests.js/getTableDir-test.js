const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");

const mockResponse = {
  Item: {
    ID: "Hola",
    DIRECCIO: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(estacionesRepository, "getTableDir").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(estacionesRepository, "getTableDir").mockRestore();
});

describe("Get Table Dir estaciones testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció getTableDir de estacionesRepository", () => {
    estacionesService.getTableDir();
    expect(estacionesRepository.getTableDir).toHaveBeenCalled();
  });
});
