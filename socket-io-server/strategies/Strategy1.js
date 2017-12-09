const HandSolver = require('pokersolver').Hand;

module.exports = class Strategy1 {

  constructor(hand) {
    this.hand = hand;
    this.handNamesArr = [];
    this.currHandRank = 'not set';
    this.solvedHandObj = null;
    this.involvedCards = null;
    this.handAction = 'hold';

    this.createHandNameArr();
    this.identifyCurrHandRank();
  }

  getHand() {
    return this.hand;
  }
  getHandNamesArr() {
    return this.handNamesArr;
  }
  getCurrHandRank() {
    return this.currHandRank;
  }

  createHandNameArr() {
    let { hand, handNamesArr } = this;
    hand.forEach(card => {
      handNamesArr.push(card._getName());
    });
  }

  identifyCurrHandRank() {
    let { handNamesArr } = this;
    let tempInvolvedCards;
    this.solvedHandObj = HandSolver.solve(handNamesArr);
    // obtaining the rank name of the hand
    this.currHandRank = this.solvedHandObj.name;
    console.log(this.currHandRank);
    this.holdOrExchange();
  }

  holdOrExchange() {

    console.log("we're in Strategy 1");

    if (this.currHandRank !== 'Pair' || this.currHandRank !== 'Three of a Kind' || this.currHandRank !== 'Two Pair' || this.currHandRank !== 'High Card') {
      this.handAction = 'hold';
    }

    // exchange cards that arent a pair/three of a kind
    if (this.currHandRank === 'Pair' || this.currHandRank === 'Three of a Kind') {
      let tempCardRank = this.solvedHandObj.descr.split(", ")[1].split('')[0];
      if (tempCardRank === "1") tempCardRank = "T";
      
      this.hand.forEach((card,index) => {
        if (card._getRank() !== tempCardRank) {
          this.hand[index] = 'remove';
        }
      });
    }

    // exchange cards that arent two pairs
    if (this.currHandRank === 'Two Pair') {
      
      let firstTempCardRank = this.solvedHandObj.descr.split(", ")[1].split(" ")[0].split("")[0];
      if (firstTempCardRank === "1") firstTempCardRank = "T";
      
      let secondTempCardRank = this.solvedHandObj.descr.split(", ")[1].split(" ")[2].split("")[0];
      if (secondTempCardRank === "1") secondTempCardRank = "T";
      
      let tempCardRanks = [firstTempCardRank, secondTempCardRank];
      this.hand.forEach((card,index) => {
        if (card._getRank() !== tempCardRanks[0] && card._getRank() !== tempCardRanks[1]) {
          this.hand[index] = 'remove';
        }
      });
    }

    // exchange all cards
    if (this.currHandRank === 'High Card') {
      this.hand.forEach((card,index) => {
        this.hand[index] = 'remove';
      });
    }
  }

}