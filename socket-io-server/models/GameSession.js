module.exports = class GameSession {

  constructor(numPlayers, players) {
    this.maxPlayers = 4;
    this.numPlayers = numPlayers;
    this.players = players; // this will be an array of players
  }

  getMaxPlayers() {
    return this.maxPlayers;
  }

  getNumPlayers() {
    return this.numPlayers;
  }

  getPlayers() {
    return this.players;
  }
}
