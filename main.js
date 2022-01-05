const http= require("http");
const express = require("express");
const socketio= require("socket.io");


const server= express();
//C'est bizarre comme logique mais Socket.io en a besoin et fait ça en background sinon.
const app = http.createServer(server);
const io = socketio(app);




server.use(express.static("./public"));

io.on("connection", (socket)=> {
    console.log(socket);
})


module.exports= app;