// server.js file is only for making of the socket.io server and express server
// Agar.io clone
const express = require("express");
const app = express();
const socketio = require("socket.io");
const helmet = require("helmet");

app.use(express.static(__dirname + "/public"));
app.use(helmet());

const expressServer = app.listen(8080);
const io = socketio(expressServer);

// App Organiation
module.exports = {
    app, io
};
