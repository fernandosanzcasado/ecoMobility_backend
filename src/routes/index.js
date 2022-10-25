const usersRouter = require("./user.router");
const estacionesRouter = require("./estaciones.router");

function routerApi(app) {
  app.use("/api/users", usersRouter);
  app.use("/api/v1/estaciones", estacionesRouter);
}

module.exports = routerApi;
