const express = require("express");
const router = express.Router();

const estacionesController = require("../modules/estaciones/controller/estaciones.controller");

router.get(`/`, estacionesController.scanTable);

router.get(`/coordenadas`, estacionesController.getTableCoord);

router.get(`/direccion`, estacionesController.getTableDir);

router.get(`/:potencia`, estacionesController.filterByPotencia);

router.get(`/:Id`, estacionesController.findById);

router.get(`/:Id/coordenadas`, estacionesController.getCoordById);

router.get(`/:Id/direccion`, estacionesController.getDirById);

router.post(`/`, estacionesController.create);

router.delete(`/:Id`, estacionesController.deleteByID);

router.put(`/:Id`, estacionesController.update);

module.exports = router;
