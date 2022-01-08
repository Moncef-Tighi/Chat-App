const http= require("http");
const express = require("express");
const socketio= require("socket.io");



const server= express();
//C'est bizarre comme logique mais Socket.io en a besoin et fait ça en background sinon.
const app = http.createServer(server);
const io = socketio(app);
let connectedUsers=[];



server.use(express.static("./public"));




io.on("connection", (socket)=> {
    let currentUser;

    socket.emit("welcome", "The websocket connexion have been established");

    socket.on("sendMessage", (message, sender)=> {
        socket.broadcast.emit("updateMessages", message, sender,"")
        socket.emit("updateMessages", message, sender,"my-")
    })

    socket.on("connexion", (user)=> {
        currentUser=user;
        connectedUsers.push(currentUser);
        //console.log("Connexion " + connectedUsers)
        io.emit("updateList", connectedUsers)
    })

    socket.on("disconnect", ()=> {
        var index = connectedUsers.indexOf(currentUser);
        if (index > -1) {
            connectedUsers.splice(index, 1);
        }
        //console.log("Déconnexion " + connectedUsers)
        io.emit("updateList", connectedUsers)
    })

})

module.exports= app;