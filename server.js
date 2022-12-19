const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

// const routerApi = require("./src/routes"); // ESTO NO SE PUEDE HACER TAL COMO ESTA ESTRUCTURADO EL PROYECTO (SPRINT 2 LO MIRAMOS)

const createServer = async () => {
  app.use(bodyParser.json());

  // routes
  require(`./src/routes/`)(app);
  // routerApi(app); // ESTO NO SE PUEDE HACER TAL COMO ESTA ESTRUCTURADO EL PROYECTO (SPRINT 2 LO MIRAMOS)

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

module.exports = {
  createServer,
};
