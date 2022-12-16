const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("Servidor conectadoooooooooooo" + socket.id);
  socket.on("chat message", (msg) => {
    console.log(msg);
    socket.emit("Server response", msg);
  });
});

server.listen(port, () => console.log("server running on port " + port));
