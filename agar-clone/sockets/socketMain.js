// where all our main socket stuff will go
const io = require("../servers").io;

// ===============CLASSES==============
const Orb = require("./classes/Orb");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");
const Player = require("./classes/Player");

let orbs = [];
let players = [];
let settings = {
    defaultOrbs: 500,
    defaultSpeed: 6,
    defaultSize: 6,
    // as player gets bigget, zoom needs to go out
    defaultZoom: 1.5,
    worldWidth: 500,
    worldHeight: 500
}

initGame();

// issue a message to every connected socket 30fps
setInterval(() => {
    io.to("game").emit("tock", {
        players
    })
}, 33); // there are 30 33's in 1000 milli seconds or 1/30th of the second or 1 od 30fps

io.sockets.on("connect", socket => {
    let player = {};
    
    // a player has connected
    socket.on("init", data => {
        // add the player to the game namespace 
        socket.join("game");
        // make a player config object
        let playerConfig = new PlayerConfig(settings);
        // make a player data object
        let playerData = new PlayerData(data.playerName, settings);
        // make a master player object to hold both
        player = new Player(socket.id, playerConfig, playerData);

        socket.emit("initReturn", {
            orbs
        });

        players.push(playerData);
    });

    // the server sent over the tick, that means we know what direction to move the socket
    socket.on("tick", data => {
        speed = player.playerConfig.speed;

        // update the player config in new direction in data
        // and at the same time create a local variable for this callback for readability
        xV = player.playerConfig.xVector = data.xVector;
        yV = player.playerConfig.yVector = data.yVector;

        if((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > 500) && (xV > 0)){
            player.playerData.locY -= speed * yV;
        }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)){
            player.playerData.locX += speed * xV;
        }else{
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        } 
    });
});

// Run at the begining of the game
function initGame() {
    for (let index = 0; index < settings.defaultOrbs; index++) {
        orbs.push(new Orb(settings));
    }
}

module.exports = io;
