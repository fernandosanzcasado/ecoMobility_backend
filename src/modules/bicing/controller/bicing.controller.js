const bicingService = require("../service/bicing.service");

class bicingController {
  async bicingAll(req, res) {
    try {
      console.log("controller");
      const data = await bicingService.bicingAll();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingAllById(req, res) {
    try {
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingCoords(req, res) {
    try {
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingCoordsById(req, res) {
    try {
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingInfo(req, res) {
    try {
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async bicingInfoById(req, res) {
    try {
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new bicingController();
