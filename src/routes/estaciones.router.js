const express = require("express");
const router = express.Router();

const estacionesController = require("../modules/estaciones/controller/estaciones.controller");

router.get(`/`, estacionesController.scanTable);

router.get(`/coordenadas`, estacionesController.getTableCoord);

router.get(`/direccion`, estacionesController.getTableDir);

router.get(`/id/:Id`, estacionesController.findById);

router.get(`/id/:Id/coordenadas`, estacionesController.getCoordById);

router.get(`/id/:Id/direccion`, estacionesController.getDirById);

router.post(`/`, estacionesController.create);

router.delete(`/id/:Id`, estacionesController.deleteByID);

router.put(`/id/:Id`, estacionesController.update);

module.exports = router;
