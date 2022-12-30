const express = require("express");
const session = require("express-session");
const passport = require("passport");

const usersRouter = require("./user.router");
const estacionesRouter = require("./estaciones.router");
const routesRouter = require("./routes.router")


function routerApi(app) {
  const router = express.Router();

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }))

  app.use(passport.session());


  app.use("/api/v2", router);
  router.get("/healthcheck", (req, res) => {
    res.send("Backend running");
  });
  router.use("/users", usersRouter);
  router.use("/estaciones", estacionesRouter);
  router.use("/routes", routesRouter);
}

module.exports = routerApi;
