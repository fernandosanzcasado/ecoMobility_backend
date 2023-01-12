const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const usersRouter = require("./user.router");
const estacionesRouter = require("./estaciones.router");
const routesRouter = require("./routes.router");
const bicingRouter = require("./bicing.router");
const valoracionesRouter = require("./valoraciones.router");

function routerApi(app) {
  const router = express.Router();

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.session());

  app.use("/api/v2", router);
  router.get("/healthcheck", (req, res) => {
    res.send("Backend running");
  });
  router.get("/apiDocCatCultura.yaml", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../", "apiDocCatCultura.yaml"),
      (err) => {
        console.log(err);
      }
    );
  });
  router.use("/users", usersRouter);
  router.use("/valoraciones", valoracionesRouter);
  router.use("/estaciones", estacionesRouter);
  router.use("/routes", routesRouter);
  router.use("/bicing", bicingRouter);
}

module.exports = routerApi;
