const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");

const mockResponse = {
  Item: {
    id: "Hola",
    direccio: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest
    .spyOn(estacionesRepository, "getTableCoord")
    .mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(estacionesRepository, "getTableCoord").mockRestore();
});

describe("Get Table Coord estaciones testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció getTableCoord de estacionesRepository", () => {
    estacionesService.getTableCoord();
    expect(estacionesRepository.getTableCoord).toHaveBeenCalled();
  });
});
