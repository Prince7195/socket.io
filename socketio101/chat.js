const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/chat.html');
});

io.on("connection", socket => {
    socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
    socket.on("messageToServer", msg => {
    });
    socket.on("newMessageToServer", msg => {
        // socket.emit("messageToClients", { text: msg.text });
        // socket.broadcast.emit('messageToClients', { text: msg.text });
        // or
        io.emit('messageToClients', { text: msg.text });
    })
});
