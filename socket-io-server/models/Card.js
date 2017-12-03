class Card {
  
  constructor(card) {
    this.card = {
      suite: '',
      rank: '',
      face: ''
    }
  }

  _getSuite() {
    return this.card.suite;
  }

  _getRank() {
    return this.card.rank;
  }

  _getFace() {
    return this.card.face;
  }

  _setSuite(suite) {
    this.card.suite = suite;
  }

  _setRank(rank) {
    this.card.rank = rank;
  }

  _setFace(face) {
    this.card.face = face;
  }

}

export default Card;