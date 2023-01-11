const express = require("express");
const app = express();
const portBack = 3000;
const portSocket = 3030;

const bodyParser = require("body-parser");

const serverSocket = require("http").createServer(app);
const io = require("socket.io")(serverSocket);

const createServer = async () => {
  app.use(bodyParser.json());

  // routes
  require(`./src/routes/`)(app);
  // routerApi(app); // ESTO NO SE PUEDE HACER TAL COMO ESTA ESTRUCTURADO EL PROYECTO (SPRINT 2 LO MIRAMOS)

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
};

module.exports = {
  createServer,
};
