const express = require("express");

const usersRouter = require("./user.router");
const estacionesRouter = require("./estaciones.router");

function routerApi(app) {
  const router = express.Router();
  
  app.use("/api/v2", router);
  router.use("/users", usersRouter);
  router.use("/estaciones", estacionesRouter);
}

module.exports = routerApi;
