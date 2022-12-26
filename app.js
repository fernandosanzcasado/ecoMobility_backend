const express = require("express");
const app = express();
const port = 3000;

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
