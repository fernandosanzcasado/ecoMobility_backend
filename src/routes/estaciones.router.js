const express = require("express");
const router = express.Router();

const estacionesController = require("../modules/estaciones/controller/estaciones.controller");

router.get(`/`, estacionesController.scanTable);

router.get(`/coordenadas`, estacionesController.getTableCoord);

router.get(`/direccion`, estacionesController.getTableDir);

router.get("/bicing", estacionesController.bicing);
router.get("/bicing2", estacionesController.bicing_segundo);
router.get("/bicing3", estacionesController.bicing_tercero);

router.get(`/:Id`, estacionesController.findById);

router.get(`/:Id/coordenadas`, estacionesController.getCoordById);

router.get(`/:Id/direccion`, estacionesController.getDirById);

router.post(`/`, estacionesController.create);

router.delete(`/:Id`, estacionesController.deleteByID);

router.put(`/:Id`, estacionesController.update);

router.get(`/atributs`, estacionesController.contratributs);

module.exports = router;
