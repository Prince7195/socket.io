const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/chat.html');
});

// io.on() === io.of("/").on();
io.on("connection", socket => {
    // console.log(socket.handshake);
    // build the namespace list with image and endpoint;
    const nsList = namespaces.map(ns => ({
        img: ns.img,
        endpoint: ns.endpoint
    }));
    // send the nsList to the client,
    // not with io, only for the current client
    socket.emit("nsList", nsList);
});

// looping all the namesapces
namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on("connection", nsSocket => {
        // console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
        // a socket has connected to one of the chatgroup namespace
        // send the ns group info back
        nsSocket.emit("nsRoomsList", namespace.rooms);
        const username = nsSocket.handshake.query.username;
        nsSocket.on("joinRoom", (roomToJoin, numOfUserCallback) => {
            // befor joining the new room, leave the remaining room
            const roomToLeave = Array.from(nsSocket.rooms)[1];
            nsSocket.leave(roomToLeave);
            updatedUsersInRoom(namespace, roomToLeave);
            // deal with history once we have it
            nsSocket.join(roomToJoin);
            // const ids = await io.of(namespace.endpoint).in(roomToJoin).allSockets();
            // console.log(ids);
            // numOfUserCallback(ids.size);
            const nsRoom = namespace.rooms.find(room => {
                return room.roomTitle === roomToJoin
            });
            nsSocket.emit("historyCatchUp", nsRoom.history);
            updatedUsersInRoom(namespace, roomToJoin);
        });

        nsSocket.on("newMessageToServer", msg => {
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username,
                avatar: "https://via.placeholder.com/30"
            };
            // console.log(msg);
            // send this msg to all the sockets that are in the room that this socket is in.
            // how to fin the room in which the socket is in.
            // console.log(Array.from(nsSocket.rooms));
            // the user will be in the second room in the object list.
            // this is bcoz the socket always join its own room on Connection.
            // get the keys
            const roomTitle = Array.from(nsSocket.rooms)[1];
            // we have to fine the room from the rooms
            const nsRoom = namespace.rooms.find(room => {
                return room.roomTitle === roomTitle
            });
            nsRoom.addMessage(fullMsg);
            io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
        });
    });
});

async function updatedUsersInRoom(namespace, roomToJoin) {
    // send back the number of users in the room connected to this room
    const ids = await io.of(namespace.endpoint).in(roomToJoin).allSockets();
    io.of(namespace.endpoint).in(roomToJoin).emit("updateMembers", ids.size);
}
