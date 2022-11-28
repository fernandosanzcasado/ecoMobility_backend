const estacionesService = require("../service/estaciones.service");

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class estacionesController {
  async scanTable(req, res) {
    const data = await estacionesService.scanTable(req.query, req.body);
    res.json(data);
  }

  async getTableCoord(req, res) {
    const data = await estacionesService.getTableCoord();
    res.json(data);
  }

  async getTableDir(req, res) {
    const data = await estacionesService.getTableDir();
    res.json(data);
  }

  async findById(req, res) {
    try {
      const data = await estacionesService.findById(req.params.Id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async getCoordById(req, res) {
    try {
      const data = await estacionesService.getCoordById(req.params.Id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async getDirById(req, res) {
    try {
      const data = await estacionesService.getDirById(req.params.Id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async create(req, res) {
    try {
      const data = await estacionesService.postEstacion(req.body);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async update(req, res) {
    try {
      const data = await estacionesService.update(req.params.Id, req.body);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async deleteByID(req, res) {
    try {
      await estacionesService.deleteByID(req.params.Id);
      res.json(`Estación ` + req.params.Id + " deleted successfully");
    } catch (err) {
      res.json(err);
    }
  }

  async contratributs(req, res) {
    await estacionesService.canviatributs();
  }

  async bicing() {
    let ret;
    await estacionesService.bicing().then((data) => (ret = data.message));
  }

  async bicing(req, res) {
    try {
      const url =
        "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information";
      const data = await estacionesService.bicing(url);
      console.log("CONTROLLER ####################################");
      // console.log(data);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicing_segundo(req, res) {
    try {
      const url_segundo =
        "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status/";
      const data = await estacionesService.bicing_segundo(url_segundo);
      console.log("CONTROLLER ##########SEGUNDOOOOO##########################");
      // console.log(data);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicing_tercero(req, res) {
    try {
      const url_tercero =
        "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states";
      const data = await estacionesService.bicing_tercero(url_tercero);
      console.log("CONTROLLER ###########TERCEROOOOO#########################");
      // console.log(data);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new estacionesController();
