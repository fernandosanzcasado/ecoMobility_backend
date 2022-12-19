const express = require("express");

const usersRouter = require("./user.router");
const estacionesRouter = require("./estaciones.router");

function routerApi(app) {
  const router = express.Router();

  app.use("/api/v2", router);
  router.get("/healthcheck", (req, res) => {
    res.send("Backend running");
  });
  router.use("/users", usersRouter);
  router.use("/estaciones", estacionesRouter);
}

module.exports = routerApi;
