const valoracionesService = require("../service/valoraciones.service");

class valoracionesController {
  async scanTable(req, res) {
    try {
      const data = await valoracionesService.scanTable();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async userVal(req, res) {
    const data = await estacionesService.userVal(req.id);
    res.json(data);
  }

  async estacionVal(req, res) {
    const data = await estacionesService.estacionVal(req.id);
    res.json(data);
  }

  async infoVal(req, res) {
    try {
      const data = await valoracionesService.infoVal(req.params.id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async postVal(req, res) {
    try {
      const data = await valoracionesService.postVal(req.body);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async updateVal(req, res) {
    try {
      const data = await valoracionesService.updateVal(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async deleteVal(req, res) {
    try {
      await valoracionesService.deleteVal(req.params.id);
      res.json(`Valoración ` + req.params.id + " deleted successfully");
    } catch (err) {
      res.json(err);
    }
  }
}
module.exports = new valoracionesController();
