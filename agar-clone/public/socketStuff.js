const socket = io.connect("http://localhost:8080");

// this function called when the user clicks Start button
function init() {
    // start drawing on the screen
    draw();

    // call the init event when the client is ready for the data
    socket.emit("init", {
        playerName: player.name
    });
}

socket.on("initReturn", data => {
    orbs = data.orbs;
    setInterval(() => {
        socket.emit("tick", {
            xVector: player.xVector,
            yVector: player.yVector
        })
    }, 33);
});

socket.on("tock", data => {
    players = data.players;
});
