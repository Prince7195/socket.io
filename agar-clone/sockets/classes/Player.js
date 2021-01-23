// this is where all the data stored about the player

class Player {
   constructor(socketId, playerConfig, playerData) {
       this.socketId = socketId;
       this.playerConfig = playerConfig;
       this.playerData = playerData;
   } 
}

module.exports = Player;
