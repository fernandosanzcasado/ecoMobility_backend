const valoracionesService = require("../../modules/valoraciones/service/valoraciones.service");
const valoracionesRepository = require("../../modules/valoraciones/repository/valoraciones.repository");
const ValoracionNoContentError = require("../../errors/valoraciones.errors/valoracionNoContent");

const mockResponse = {
  Items: [
    {
      idEstacion: "767f9b0e-329a-4681-af39-73075b86e68a",
      emailUser: "marc.fonseca@estudiantat.upc.edu",
      id: "ef142cce-fe20-479a-a826-50c33abed968",
      valoracion: "7",
    },
  ],
  Count: 4,
  ScannedCount: 4,
};

beforeEach(() => {
  jest.spyOn(valoracionesRepository, "scanTable").mockImplementation(() => {
    return mockResponse;
  });
});
afterEach(() => {
  jest.spyOn(valoracionesRepository, "scanTable").mockRestore();
});

describe("Get all valoraciones testing!", () => {
  test("Passarà amb éxit ja que crida a la funció scanTable de valoracionesRepository i el filtra amb un mail i un id d'estació vàlid", () => {
    const input = {
      emailUser: "marc.fonseca@estudiantat.upc.edu",
      idEstacion: "767f9b0e-329a-4681-af39-73075b86e68a",
    };
    const output = [
      {
        idEstacion: "767f9b0e-329a-4681-af39-73075b86e68a",
        emailUser: "marc.fonseca@estudiantat.upc.edu",
        id: "ef142cce-fe20-479a-a826-50c33abed968",
        valoracion: "7",
      },
    ];
    expect.assertions(1);
    valoracionesService
      .scanTable(input)
      .then((returnData) => expect(returnData).toEqual(output));
  });

  test("Passarà ja que s'espera un error per cridar a la funció scanTable de valoracionesRepository i filtrar amb un mail i un id d'estació vàlid", () => {
    const input = {
      emailUser: "marc.fonseca@estudiantat.upc.edu",
      idEstacion: "27a468da-70ff-43fe-b221-c7115fcf6d32",
    };
    expect.assertions(1);
    expect(valoracionesService.scanTable(input)).rejects.toThrow(
      new ValoracionNoContentError()
    );
  });
});
