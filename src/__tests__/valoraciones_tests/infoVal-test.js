const valoracionesService = require("../../modules/valoraciones/service/valoraciones.service");
const valoracionesRepository = require("../../modules/valoraciones/repository/valoraciones.repository");
const valoracionNotFoundError = require("../../errors/valoraciones.errors/valoracionNotFound");

const mockResponse = {
  Item: {
    idEstacion: "767f9b0e-329a-4681-af39-73075b86e68a",
    emailUser: "marc.fonseca@estudiantat.upc.edu",
    id: "ef142cce-fe20-479a-a826-50c33abed968",
    valoracion: "7",
  },
};

beforeEach(() => {
  jest.spyOn(valoracionesRepository, "findById").mockImplementation((id) => {
    if (id == "ef142cce-fe20-479a-a826-50c33abed968") return mockResponse;
    else return {};
  });
});
afterEach(() => {
  jest.spyOn(valoracionesRepository, "findById").mockRestore();
});

describe("Get valoracion amb id testing!", () => {
  test("Passarà amb éxit ja que crida a la funció findById de valoracionesRepository amb un id de valoració vàlid", () => {
    const input = "ef142cce-fe20-479a-a826-50c33abed968";
    const output = {
      idEstacion: "767f9b0e-329a-4681-af39-73075b86e68a",
      emailUser: "marc.fonseca@estudiantat.upc.edu",
      id: "ef142cce-fe20-479a-a826-50c33abed968",
      valoracion: "7",
    };
    expect.assertions(1);
    valoracionesService
      .infoVal(input)
      .then((returnData) => expect(returnData).toEqual(output));
  });

  test("Passarà ja que s'espera un error per cridar a la funció findById de valoracionesRepository amb un id de valoració invàlid", () => {
    const input = "27a468da-70ff-43fe-b221-c7115fcf6d32";
    expect.assertions(1);
    expect(valoracionesService.infoVal(input)).rejects.toThrow(
      new valoracionNotFoundError()
    );
  });
});
