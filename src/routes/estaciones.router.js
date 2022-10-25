const express = require("express");
const router = express.Router();

const estacionesController = require("../modules/estaciones/controller/estaciones.controller");

router.get(`/`, estacionesController.scanTable);

router.get(`/coordenadas`, estacionesController.getTableCoord);

router.get(`/direccion`, estacionesController.getTableDir);

router.get(`/:Id`, estacionesController.findById);

router.get(`/:Id/coordenadas`, estacionesController.getCoordById);

router.get(`/:Id/direccion`, estacionesController.getDirById);

// router.delete(`/(:ID)`, estacionesController.deleteByID);

// router.post(`/`, estacionesController.create);

module.exports = router;
