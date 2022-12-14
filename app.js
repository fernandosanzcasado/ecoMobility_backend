const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
require(`dotenv`).config();

const routerApi = require("./src/routes");

app.use(bodyParser.json());

routerApi(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
