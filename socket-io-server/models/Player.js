module.exports = class Player {

  constructor(id, type, strategy) {
    this.id = id;
    this.type = type;
    this.strategy = strategy;
  }

  getId() {
    return this.id;
  }
  getType() {
    return this.type;
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
  setStrategy(strategy) {
    this.strategy = strategy;
  }
}