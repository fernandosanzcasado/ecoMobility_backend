const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");
const EstacionNotFoundError = require("../../errors/estaciones.errors/estacionNotFound");

const mockResponse = {
  Item: {
    id: "10",
    direccio: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(estacionesRepository, "findById").mockImplementation((id) => {
    if (id == 10) {
      return mockResponse;
    } else return "1";
  });

  jest
    .spyOn(estacionesRepository, "postOrUpdateEstacion")
    .mockImplementation((data) => data);
});

afterEach(() => {
  jest.spyOn(estacionesRepository, "findById").mockRestore();

  jest.spyOn(estacionesRepository, "postOrUpdateEstacion").mockRestore();
});

describe("Update estació by Id testing!", () => {
  test("Passarà amb éxit ja que crida a la funció postOrUpdateEstacion de estacionesRepository amb un id vàlid", () => {
    const inputData = {
      latitud: "23.89135485",
      longitud: "81.68531686",
    };
    const inputId = "10";

    const newData = {
      id: "10",
      direccio: "C/Jordi Girona, 1-3",
      latitud: "23.89135485",
      longitud: "81.68531686",
    };
    expect.assertions(1);
    estacionesService
      .update(inputId, inputData)
      .then(() =>
        expect(estacionesRepository.postOrUpdateEstacion).toBeCalledWith(
          newData
        )
      );
  });

  test("Passarà ja que s'espera un error per cridar a la funció postOrUpdateEstacion de estacionesRepository amb un id invàlid", () => {
    const inputData = {
      latitud: "23.89135485",
      longitud: "81.68531686",
    };
    const inputId = 15;
    expect.assertions(1);
    expect(estacionesService.update(inputId, inputData)).rejects.toThrow(
      new EstacionNotFoundError()
    );
  });
});
