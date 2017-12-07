const Card = require("./Card");

module.exports = class Deck {

  constructor() {
    this.suites = ['s', 'c', 'h', 'd'];
    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    this.rankValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
    this.faces = ['facedown', 'faceup'];
    this.deck = [];
    this.handArr = ['firstHand', 'secondHand', 'thirdHand', 'fourthHand'];
    this.hands = {
      firstHand: [],
      secondHand: [],
      thirdHand: [],
      fourthHand: [],
    };

    this.initDeck();
    this.initHands();
    this.rearrangeHandsAscending();
  }

  initDeck() {
    let { suites, ranks, faces, deck, handArr, hands, rankValues } = this;

    for (let i = 0; i < suites.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        deck.push(new Card(suites[i], ranks[j], ranks[j] + suites[i], faces[0], rankValues[j]));
      }
    }
  }

  initHands() {
    let { suites, ranks, faces, deck, handArr, hands } = this;
    let tempCard, randIndex, tempDeck; 
    
    for(let i = 0; i < 5; i++) {
      handArr.forEach(hand => {
        
        randIndex = Math.floor(Math.random(0,deck.length) * deck.length);
        tempCard = deck.splice(randIndex,1);
        hands[hand].push(tempCard[0]);
      });
    }
  }

  rearrangeHandsAscending() {
    let { suites, ranks, faces, deck, handArr, hands } = this;
    let minIdx, temp;

    handArr.forEach(hand => { 
      for (let i = 0; i < hands[hand].length; i++) {
        minIdx = i;
        for (let j = i+1; j < hands[hand].length; j++) {
          if (parseInt(hands[hand][j]._getNumValue()) < parseInt(hands[hand][minIdx]._getNumValue()))
            minIdx = j;
        }
        temp = hands[hand][i];
        hands[hand][i] = hands[hand][minIdx];
        hands[hand][minIdx] = temp;
      }      
    });
  }
  
  getDeck() {
    return this.deck;
  }
  
  getHands() {
    return this.hands;
  }

  getHandArr() {
    return this.handArr;
  }
}