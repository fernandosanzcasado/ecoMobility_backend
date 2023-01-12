const express = require("express");
const cors = require("cors");

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

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);

app.use("/apiDocs", swaggerUI.serve, swaggerUI.setup(specs));

dotenv.config();
const portBack = 3000;
const portSocket = 3030;

const bodyParser = require("body-parser");

const serverSocket = require("http").createServer(app);
const io = require("socket.io")(serverSocket, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const fileUpload = require("express-fileupload");
require(`dotenv`).config();

const routerApi = require("./src/routes");

app.use(bodyParser.json());
app.use(fileUpload());

routerApi(app);

app.listen(portBack, () => {
  console.log(`App listening at http://localhost:${portBack}`);
});

serverSocket.listen(portSocket, () =>
  console.log("Socket listening at http://localhost:" + portSocket)
);

io.on("connection", (socket) => {
  console.log("Servidor conectado " + socket.id);

  socket.on("front_back", (msg) => {
    console.log(socket.id);
    console.log("Chat message from app : " + msg);
    io.emit("admin_back", msg);

    // io.emit("broad", "EMIT BROADCAST HARDCODE");
  });

  socket.on("admin_back", (msg) => {
    console.log(socket.id);
    console.log("Chat message from admin : " + msg);
    io.emit("front_back", msg);
    // io.emit("broad", "EMIT BROADCAST HARDCODE");
  });
});
