const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const handleError = require("../middleware/errorHandler");
const validateRequsestSchema = require("../middleware/validateRequestSchema");
const userAuthentication = require("../middleware/userAuthentication");
const valoracionesPostSchema = require("../schemas/valoracionesPostSchema");
const valoracionesUpdateSchema = require("../schemas/valoracionesUpdateSchema");

const valoracionesController = require("../modules/valoraciones/controller/valoraciones.controller");

router.get(`/`, valoracionesController.scanTable);
router.get(`/user/:emailUser`, valoracionesController.userVal);
router.get(`/estacion/:idEstacion`, valoracionesController.estacionVal);
router.get(`/info/:id`, valoracionesController.infoVal);
router.post(
  `/`,
  valoracionesPostSchema,
  validateRequsestSchema,
  valoracionesController.postVal
);
router.delete(`/info/:id`, valoracionesController.deleteVal);
router.put(
  `/info/:id`,
  valoracionesUpdateSchema,
  validateRequsestSchema,
  valoracionesController.updateVal
);

module.exports = router;
