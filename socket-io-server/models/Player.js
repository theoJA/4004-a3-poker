module.exports = class Player {

  constructor(id, type, hand, strategy) {
    this.id = id;
    this.type = type;
    this.hand = hand;
    this.strategy = strategy;
  }

  getId() {
    return this.id;
  }
  getType() {
    return this.type;
  }
  getHand() {
    return this.hand;
  }
  getStrategy() {
    return this.strategy;
  }

  // might not need setters
  setId(id) {
    this.id = id;
  }
  setType(type) {
    this.type = type;
  }
  setHand(hand) {
    this.hand = hand;
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
}