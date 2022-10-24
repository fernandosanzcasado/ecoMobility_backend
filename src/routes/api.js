const userController = require("../modules/user/controller/user.controller");
const estacionesController = require("../modules/estaciones/controller/estaciones.controller");
const { check, validationResult } = require("express-validator");

module.exports = async (app) => {
  app.get(`/api/users/:email`, userController.findByEmail);
  app.post(`/api/users`, userController.create);
  app.put(`/api/users/:email`, userController.updateUserInfo);
  app.delete(`/api/users/:email`, userController.deleteByEmail);
  app.post(`/api/users/login`, userController.loginUser);
  app.post(
    `/api/users/register`,
    [
      check("email").notEmpty().isEmail(),
      check("password").isLength({ min: 5 }),
    ],
    userController.registerUser
  );

  app.get(`/api/v1/estaciones`, estacionesController.scanTable);
  app.get(`/api/v1/estaciones/coordenadas`, estacionesController.getTableCoord);
  app.get(`/api/v1/estaciones/direccion`, estacionesController.getTableDir);
  app.get(`/api/v1/estaciones/:Id`, estacionesController.findById);
  app.get(
    `/api/v1/estaciones/:Id/coordenadas`,
    estacionesController.getCoordById
  );
  app.get(`/api/v1/estaciones/:Id/direccion`, estacionesController.getDirById);
  //app.delete(`/api/v1/estaciones(:ID)`, estacionesController.deleteByID);
  //app.post(`/api/v1/estaciones`, estacionesController.create);
};
