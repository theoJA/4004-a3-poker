import Card from "./Card";

class Deck {

  constructor() {
    this.suites = ['spades', 'clubs', 'hearts', 'diamonds'];
    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.faces = ['faceup', 'facedown'];
    this.deck = [];
    this.hands = {
      firstHand: [],
      secondHand: [],
      thirdHand: [],
      fourthHand: [],
    };
  }

  _initDeck() {
  
  }

  _initHands() {

  }
}