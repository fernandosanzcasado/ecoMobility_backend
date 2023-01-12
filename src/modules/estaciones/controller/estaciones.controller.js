const estacionesService = require("../service/estaciones.service");

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class estacionesController {
  async scanTable(req, res) {
    try {
      const data = await estacionesService.scanTable(req.query);
      res.json(data);
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  }

  async countEstaciones(req, res) {
    const data = await estacionesService.countEstaciones();
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
      const data = await estacionesService.findById(req.params.id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async getCoordById(req, res) {
    try {
      const data = await estacionesService.getCoordById(req.params.id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async getDirById(req, res) {
    try {
      const data = await estacionesService.getDirById(req.params.id);
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
      const data = await estacionesService.update(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async deleteByID(req, res) {
    try {
      await estacionesService.deleteByID(req.params.id);
      res.json(`Estación ` + req.params.id + " deleted successfully");
    } catch (err) {
      res.json(err);
    }
  }
}
module.exports = new estacionesController();
