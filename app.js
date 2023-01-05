const express = require("express");

const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "ecoMobility - Grovyle API",
      description: "API documentation for ecoMobility release v2.0 Grovyle.",
      version: "2.0.0",
      contact: {
        name: "Mail",
        email: "ecomobilityupc@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v2/",
        url: "http://15.188.52.76:3000/api/v2/",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use("/apiDocs", swaggerUI.serve, swaggerUI.setup(specs));

dotenv.config();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require(`dotenv`).config();

const routerApi = require("./src/routes");

app.use(bodyParser.json());
app.use(fileUpload());

routerApi(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
