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

  io.on("connection", (socket) => {
    console.log("Servidor conectadoooooooooooo" + socket.id);
    socket.on("chat message", (msg) => {
      console.log(msg);
      socket.emit("Server response", msg);
    });
  });

  serverSocket.listen(portSocket, () =>
    console.log("Socket listening at http://localhost:" + portSocket)
  );
};

module.exports = {
  createServer,
};
