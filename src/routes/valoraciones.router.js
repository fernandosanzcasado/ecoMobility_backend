const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const handleError = require("../middleware/errorHandler");
const validateRequsestSchema = require("../middleware/validateRequestSchema");
const userAuthentication = require("../middleware/userAuthentication");

const valoracionesController = require("../modules/estaciones/controller/valoraciones.controller");

router.get(`/`, valoracionesController.scanTable);
router.get(`/user/`, valoracionesController.userVal);
router.get(`/estacion`, valoracionesController.estacionVal);
router.get(`/info/:id`,valoracionesController.infoVal);
router.post(`/`,valoracionesController.postVal);
router.delete(`/info/:id`,valoracionesController.deleteVal);
router.put(`/info/:id`,valoracionesController.updateVal);

module.exports = router;
