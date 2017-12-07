const Strategy1 = require('../strategies/Strategy1');

module.exports = class GameSession {

  constructor( usedDeck, hands, handArr, numPlayers, players ) {
    this.maxPlayers = 4;
    this.usedDeck = usedDeck;
    this.hands = hands;
    this.handArr = handArr;
    this.numPlayers = numPlayers;
    this.players = players; // this will be an array of players

    this.giveHandToEachPlayer();
    this.useStrategy1();
  }

  getMaxPlayers() {
    return this.maxPlayers;
  }
  getUsedDeck() {
    return this.usedDeck;
  }
  getHands() {
    return this.hands;
  }
  getNumPlayers() {
    return this.numPlayers;
  }
  getPlayers() {
    return this.players;
  }

  giveHandToEachPlayer() {
    let { players, hands, handArr } = this;
    players.forEach((player, index) => {
      player.setHand(hands[handArr[index]]);      
    }); 
  }

  useStrategy1() {
    let { players, hands, handArr } = this;
    let randIndex, tempCard;

    let strategy1 = new Strategy1(players[0].getHand());
    let tempHand = strategy1.getHand();

    tempHand.forEach((card, index) => {
      if (card === 'remove') {
        randIndex = Math.floor(Math.random(0,this.usedDeck.length) * this.usedDeck.length);
        tempCard = this.usedDeck.splice(randIndex,1);
        tempCard[0]._setFace('faceup'); 
        tempHand[index] = tempCard[0];
      }
    });

    this.players[0].setHand(tempHand);
  }
}
