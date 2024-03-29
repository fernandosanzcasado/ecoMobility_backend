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
  jest
    .spyOn(estacionesRepository, "postOrUpdateEstacion")
    .mockImplementation((id) => true);
});
afterEach(() => {
  jest.spyOn(estacionesRepository, "postOrUpdateEstacion").mockRestore();
});

describe("Post estació testing!", () => {
  test("Passarà ja que crida a la funció postOrUpdateEstacion de estacionesRepository", () => {
    const input = {
      LATITUD: "23.89135485",
      LONGITUD: "81.68531686",
    };
    expect.assertions(1);
    estacionesService
      .postEstacion(input)
      .then(() =>
        expect(estacionesRepository.postOrUpdateEstacion).toHaveBeenCalled()
      );
  });
});
