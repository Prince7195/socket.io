const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/chat.html');
});

// io.on() === io.of("/").on();
io.on("connection", socket => {
    socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
    socket.on("messageToServer", msg => {
        console.log(msg);
    });
});

io.of("/admin").on("connection", socket => {
    console.log("Someone connected to the admin namespace");
    io.of("/admin").emit("welcome", "Welcome to Admin namespace(workspace)!");
})
