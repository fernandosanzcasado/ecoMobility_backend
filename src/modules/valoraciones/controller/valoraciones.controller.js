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
    try {
      const data = await valoracionesService.userVal(req.params.emailUser);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async estacionVal(req, res) {
    try {
      const data = await valoracionesService.estacionVal(req.params.idEstacion);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
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
      const data = await valoracionesService.updateVal(
        req.params.id,
        req.body.valoracion
      );
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
