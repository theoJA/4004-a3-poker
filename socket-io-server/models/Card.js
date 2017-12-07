module.exports = class Card {
  
  constructor(suite,rank,name,face,numValue) {
    this.suite = suite;
    this.rank = rank;
    this.name = name;
    this.face = face;
    this.numValue = numValue;
  }

  _getSuite() {
    return this.suite;
  }
  _getRank() {
    return this.rank;
  }
  _getName() {
    return this.name;
  }
  _getFace() {
    return this.face;
  }
  _getNumValue() {
    return this.numValue;
  }


  _setSuite(suite) {
    this.suite = suite;
  }
  _setRank(rank) {
    this.rank = rank;
  }
  _setName(name) {
    this.name = name;
  }
  _setFace(face) {
    this.face = face;
  }

}