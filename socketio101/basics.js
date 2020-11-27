// using http insted expressjs
const http = require("http");
// websocket
const socketio = require("socket.io");

// we make a http server with node
const server = http.createServer((req, res) => {
    res.end("I'm connected.");
});

const io = socketio(server);

io.on("connection", (socket, req) => {
    socket.emit("welcome", "A message from the socket.io server!");
    socket.on("message", (msg) => {
        console.log(msg);
    });
})

server.listen(8000);
