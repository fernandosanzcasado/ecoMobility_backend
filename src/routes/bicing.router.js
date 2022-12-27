const express = require("express");
const router = express.Router();

const bicingController = require("../modules/bicing/controller/bicing.controller");

router.get("/", bicingController.bicingAll);
router.get("/coordenadas", bicingController.bicingCoords);
router.get("/info", bicingController.bicingInfo);
router.get("/count", bicingController.bicingInfoById);

router.get("/coordenadas/:id", bicingController.bicingCoordsById);
router.get("/info/:id", bicingController.bicingInfoById);
router.get("/:id", bicingController.bicingAllById);

module.exports = router;
