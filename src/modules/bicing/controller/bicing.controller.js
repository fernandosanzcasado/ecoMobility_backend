const bicingService = require("../service/bicing.service");

class bicingController {
  async bicingAllById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingAllById(id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingCoords(req, res) {
    try {
      const data = await bicingService.bicingCoords();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingCoordsById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingCoordsById(id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingInfo(req, res) {
    try {
      const data = await bicingService.bicingInfo();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingInfoById(req, res) {
    try {
      const id = req.params.id;
      const data = await bicingService.bicingInfoById(id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingCount(req, res) {
    try {
      const data = await bicingService.bicingCount();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new bicingController();
