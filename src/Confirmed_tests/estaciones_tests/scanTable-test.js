const estacionesService = require("../../modules/estaciones/service/estaciones.service");
const estacionesRepository = require("../../modules/estaciones/repository/estaciones.repository");
const estacionFaltaLatCoords = require("../../errors/estaciones.errors/estacionFaltaLatCoords");
const estacionFaltaLongCoords = require("../../errors/estaciones.errors/estacionFaltaLongCoords");

const mockResponse = {
  Items: [
    {
      latitud: 41.61072,
      codiProv: "08",
      promotor: null,
      nPlazas: 2,
      provincia: "Barcelona",
      direccion: "Carrer de l'Aliança, 14",
      potencia: 22,
      tipoCorriente: "AC",
      tipoConexion: "MENNEKES.F",
      municipio: "Lliçà d'Amunt",
      tipoVelocidad: "semiRAPID",
      id: "57f79636-17f1-4dac-8ddd-704f6fa7432a",
      longitud: 2.23988,
      tipoVehiculo: "cotxe i moto",
    },
    {
      latitud: 41.23829,
      codiProv: "08",
      promotor: null,
      nPlazas: 2,
      provincia: "Barcelona",
      direccion: "Carrer les Modistes, 8",
      potencia: 6,
      tipoCorriente: "AC",
      tipoConexion: "MENNEKES.F+Schuko",
      municipio: "Sant Pere de Ribes",
      tipoVelocidad: "semiRAPID i NORMAL",
      id: "687739c3-a404-4a03-b62a-11682e1aec1f",
      longitud: 1.75831,
      tipoVehiculo: "cotxe i moto",
    },
    {
      latitud: 41.387398,
      codiProv: "08",
      promotor: "SABA",
      nPlazas: 2,
      provincia: "Barcelona",
      direccion: "Rambla de Catalunya, 15",
      potencia: null,
      tipoCorriente: null,
      tipoConexion: "Schuko",
      municipio: "Barcelona",
      tipoVelocidad: "NORMAL",
      id: "8f9b7085-dfa9-40fc-84c9-cb31304d0a4f",
      longitud: 2.168515,
      tipoVehiculo: "cotxe",
    },
  ],
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

describe("Filter estaciones by potencia testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository i filtrar per una potencia válida", () => {
    const input = { potencia: "20" };
    const output = [
      {
        latitud: 41.23829,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer les Modistes, 8",
        potencia: 6,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F+Schuko",
        municipio: "Sant Pere de Ribes",
        tipoVelocidad: "semiRAPID i NORMAL",
        id: "687739c3-a404-4a03-b62a-11682e1aec1f",
        longitud: 1.75831,
        tipoVehiculo: "cotxe i moto",
      },
      {
        latitud: 41.387398,
        codiProv: "08",
        promotor: "SABA",
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Rambla de Catalunya, 15",
        potencia: null,
        tipoCorriente: null,
        tipoConexion: "Schuko",
        municipio: "Barcelona",
        tipoVelocidad: "NORMAL",
        id: "8f9b7085-dfa9-40fc-84c9-cb31304d0a4f",
        longitud: 2.168515,
        tipoVehiculo: "cotxe",
      },
    ];
    expect.assertions(1);
    estacionesService
      .scanTable(input)
      .then((returnData) => expect(returnData).toEqual(output));
  });
});
describe("Filter estaciones by tipoCorriente testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository i filtrar per un tipus de corrent válid", () => {
    const input = { tipoCorriente: "AC" };
    const output = [
      {
        latitud: 41.61072,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer de l'Aliança, 14",
        potencia: 22,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F",
        municipio: "Lliçà d'Amunt",
        tipoVelocidad: "semiRAPID",
        id: "57f79636-17f1-4dac-8ddd-704f6fa7432a",
        longitud: 2.23988,
        tipoVehiculo: "cotxe i moto",
      },
      {
        latitud: 41.23829,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer les Modistes, 8",
        potencia: 6,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F+Schuko",
        municipio: "Sant Pere de Ribes",
        tipoVelocidad: "semiRAPID i NORMAL",
        id: "687739c3-a404-4a03-b62a-11682e1aec1f",
        longitud: 1.75831,
        tipoVehiculo: "cotxe i moto",
      },
    ];
    expect.assertions(1);
    estacionesService
      .scanTable(input)
      .then((returnData) => expect(returnData).toEqual(output));
  });
});

describe("Filter estaciones by tipoVelocidad testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository i filtrar per un tipus de velocitat válid", () => {
    const input = { tipoVelocidad: "semiRAPID" };
    const output = [
      {
        latitud: 41.61072,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer de l'Aliança, 14",
        potencia: 22,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F",
        municipio: "Lliçà d'Amunt",
        tipoVelocidad: "semiRAPID",
        id: "57f79636-17f1-4dac-8ddd-704f6fa7432a",
        longitud: 2.23988,
        tipoVehiculo: "cotxe i moto",
      },
      {
        latitud: 41.23829,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer les Modistes, 8",
        potencia: 6,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F+Schuko",
        municipio: "Sant Pere de Ribes",
        tipoVelocidad: "semiRAPID i NORMAL",
        id: "687739c3-a404-4a03-b62a-11682e1aec1f",
        longitud: 1.75831,
        tipoVehiculo: "cotxe i moto",
      },
    ];
    expect.assertions(1);
    estacionesService.scanTable(input).then((returnData) => {
      expect(returnData).toEqual(output);
    });
  });
});

describe("Filter estaciones by tipoVehiculo testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository i filtrar per un tipus de vehicle válid", () => {
    const input = { tipoVehiculo: "cotxe" };
    const output = [
      {
        latitud: 41.61072,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer de l'Aliança, 14",
        potencia: 22,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F",
        municipio: "Lliçà d'Amunt",
        tipoVelocidad: "semiRAPID",
        id: "57f79636-17f1-4dac-8ddd-704f6fa7432a",
        longitud: 2.23988,
        tipoVehiculo: "cotxe i moto",
      },
      {
        latitud: 41.23829,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer les Modistes, 8",
        potencia: 6,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F+Schuko",
        municipio: "Sant Pere de Ribes",
        tipoVelocidad: "semiRAPID i NORMAL",
        id: "687739c3-a404-4a03-b62a-11682e1aec1f",
        longitud: 1.75831,
        tipoVehiculo: "cotxe i moto",
      },
      {
        latitud: 41.387398,
        codiProv: "08",
        promotor: "SABA",
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Rambla de Catalunya, 15",
        potencia: null,
        tipoCorriente: null,
        tipoConexion: "Schuko",
        municipio: "Barcelona",
        tipoVelocidad: "NORMAL",
        id: "8f9b7085-dfa9-40fc-84c9-cb31304d0a4f",
        longitud: 2.168515,
        tipoVehiculo: "cotxe",
      },
    ];
    expect.assertions(1);
    estacionesService.scanTable(input).then((returnData) => {
      expect(returnData).toEqual(output);
    });
  });
});

describe("Filter estaciones by tipoConexion i Jaccard testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository i filtrar per un tipus de connexio válid", () => {
    const input = { tipoConexion: "MEnEKES" };
    const output = [
      {
        latitud: 41.61072,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer de l'Aliança, 14",
        potencia: 22,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F",
        municipio: "Lliçà d'Amunt",
        tipoVelocidad: "semiRAPID",
        id: "57f79636-17f1-4dac-8ddd-704f6fa7432a",
        longitud: 2.23988,
        tipoVehiculo: "cotxe i moto",
      },
      {
        latitud: 41.23829,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer les Modistes, 8",
        potencia: 6,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F+Schuko",
        municipio: "Sant Pere de Ribes",
        tipoVelocidad: "semiRAPID i NORMAL",
        id: "687739c3-a404-4a03-b62a-11682e1aec1f",
        longitud: 1.75831,
        tipoVehiculo: "cotxe i moto",
      },
    ];
    expect.assertions(1);
    estacionesService.scanTable(input).then((returnData) => {
      expect(returnData).toEqual(output);
    });
  });
});

describe("Filter estaciones by distancia testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository i filtrar per una distancia válida", () => {
    const input = { distancia: 5, latitud: "41.610825", longitud: "2.240216" };
    const output = [
      {
        latitud: 41.61072,
        codiProv: "08",
        promotor: null,
        nPlazas: 2,
        provincia: "Barcelona",
        direccion: "Carrer de l'Aliança, 14",
        potencia: 22,
        tipoCorriente: "AC",
        tipoConexion: "MENNEKES.F",
        municipio: "Lliçà d'Amunt",
        tipoVelocidad: "semiRAPID",
        id: "57f79636-17f1-4dac-8ddd-704f6fa7432a",
        longitud: 2.23988,
        tipoVehiculo: "cotxe i moto",
      },
    ];
    expect.assertions(1);
    estacionesService.scanTable(input).then((returnData) => {
      expect(returnData).toEqual(output);
    });
  });
});

describe("Filter estaciones by distancia testing 2!", () => {
  test("No passarà el test ja que ha cridat a la funció scanTable de estacionesRepository amb distancia però sense latitud", () => {
    const input = { distancia: 5 };
    expect.assertions(1);
    expect(estacionesService.scanTable(input)).rejects.toThrow(
      new estacionFaltaLatCoords()
    );
  });
});

describe("Filter estaciones by distancia testing 3!", () => {
  test("No passarà el test ja que ha cridat a la funció scanTable de estacionesRepository amb distancia i latitud però sense longitud", () => {
    const input = { distancia: 5, latitud: "41.610825" };
    expect.assertions(1);
    expect(estacionesService.scanTable(input)).rejects.toThrow(
      new estacionFaltaLongCoords()
    );
  });
});
