const Card = require("./Card");

module.exports = class Deck {

  constructor(riggedHandsFromClient) {
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

    this.riggedHandsFromClient = riggedHandsFromClient;
    this.riggedDeck = [];
    this.riggedHandArr1 = ['fullHouse','threeOfAKind','onePair','legit'];
    this.riggedHandArr2 = ['twoPairs','twoPairs','threeOfAKind','legit'];
    this.riggedHandArr3 = ['onePair','onePair','twoPairs','legit'];
    this.riggedHandArr4 = ['nothing','nothing','onePair','legit'];
    this.riggedHands = {
      onePair: [],
      twoPairs: [],
      threeOfAKind: [],
      fullHouse: [],
      nothing: [],
      legit: []
    };


    this.initDeck();
    this.initHands();
    //this.initRiggedHands();
    this.uiRiggedHands()
    //this.rearrangeHandsAscending();
  }



  removeSpecifiedCard(card) {
    //console.log(this.riggedDeck);
    this.riggedDeck.forEach((cardInDeck, index) => {
      if (cardInDeck._getName() === card._getName()) {
        this.riggedDeck.splice(index,1);
      }
    });
  }

  uiRiggedHands() {
    this.riggedHandsFromClient.forEach((hand, index) => {
      // ------> add legit cards here
      if (this.riggedHandArr1[index] === "legit") {
        this.riggedHands[this.riggedHandArr1[index]].push(new Card('h','A','Ah','facedown', 'x'));
        this.riggedHands[this.riggedHandArr1[index]].push(new Card('s','2','2s','facedown', 'x'));
        this.riggedHands[this.riggedHandArr1[index]].push(new Card('h','4','4h','facedown', 'x'));
        this.riggedHands[this.riggedHandArr1[index]].push(new Card('d','9','9d','facedown', 'x'));
        this.riggedHands[this.riggedHandArr1[index]].push(new Card('s','K','Ks','facedown', 'x'));
      } else {
        hand.forEach(card => {
          let name = card.split("");
          this.riggedHands[this.riggedHandArr1[index]].push(new Card(name[1], name[0], card, 'facedown', 'x'));
        });
      }
    });
  }

  // initRiggedHands() {
  //   this.riggedHands.onePair.push(new Card('d','A','Ad','facedown','14'));
  //   this.removeSpecifiedCard(this.riggedHands.onePair[0]);
  //   this.riggedHands.onePair.push(new Card('s','Q','Qs','facedown','12'));
  //   this.removeSpecifiedCard(this.riggedHands.onePair[1]);
  //   this.riggedHands.onePair.push(new Card('c','T','Tc','facedown','10'));
  //   this.removeSpecifiedCard(this.riggedHands.onePair[2]);
  //   this.riggedHands.onePair.push(new Card('h','T','Th','facedown','10'));
  //   this.removeSpecifiedCard(this.riggedHands.onePair[3]);
  //   this.riggedHands.onePair.push(new Card('d','2','2d','facedown','2'));
  //   this.removeSpecifiedCard(this.riggedHands.onePair[4]);

  //   this.riggedHands.twoPairs.push(new Card('d','J','Jd','facedown','11'));
  //   this.removeSpecifiedCard(this.riggedHands.twoPairs[0]);
  //   this.riggedHands.twoPairs.push(new Card('s','J','Js','facedown','11'));
  //   this.removeSpecifiedCard(this.riggedHands.twoPairs[1]);
  //   this.riggedHands.twoPairs.push(new Card('c','9','9c','facedown','9'));
  //   this.removeSpecifiedCard(this.riggedHands.twoPairs[2]);
  //   this.riggedHands.twoPairs.push(new Card('h','9','9h','facedown','9'));
  //   this.removeSpecifiedCard(this.riggedHands.twoPairs[3]);
  //   this.riggedHands.twoPairs.push(new Card('d','3','3d','facedown','3'));
  //   this.removeSpecifiedCard(this.riggedHands.twoPairs[4]);
    
  //   this.riggedHands.threeOfAKind.push(new Card('d','8','8d','facedown','8'));
  //   this.removeSpecifiedCard(this.riggedHands.threeOfAKind[0]);
  //   this.riggedHands.threeOfAKind.push(new Card('s','8','8s','facedown','8'));
  //   this.removeSpecifiedCard(this.riggedHands.threeOfAKind[1]);
  //   this.riggedHands.threeOfAKind.push(new Card('c','8','8c','facedown','8'));
  //   this.removeSpecifiedCard(this.riggedHands.threeOfAKind[2]);
  //   this.riggedHands.threeOfAKind.push(new Card('h','5','5h','facedown','5'));
  //   this.removeSpecifiedCard(this.riggedHands.threeOfAKind[3]);
  //   this.riggedHands.threeOfAKind.push(new Card('d','4','4d','facedown','4'));
  //   this.removeSpecifiedCard(this.riggedHands.threeOfAKind[4]);

  //   this.riggedHands.fullHouse.push(new Card('d','7','7d','facedown','7'));
  //   this.removeSpecifiedCard(this.riggedHands.fullHouse[0]);
  //   this.riggedHands.fullHouse.push(new Card('s','7','7s','facedown','7'));
  //   this.removeSpecifiedCard(this.riggedHands.fullHouse[1]);
  //   this.riggedHands.fullHouse.push(new Card('c','7','7c','facedown','7'));
  //   this.removeSpecifiedCard(this.riggedHands.fullHouse[2]);
  //   this.riggedHands.fullHouse.push(new Card('h','K','Kh','facedown','13'));
  //   this.removeSpecifiedCard(this.riggedHands.fullHouse[3]);
  //   this.riggedHands.fullHouse.push(new Card('d','K','Kd','facedown','13'));
  //   this.removeSpecifiedCard(this.riggedHands.fullHouse[4]);
  // }

  initDeck() {
    let { suites, ranks, faces, deck, riggedDeck, handArr, hands, rankValues } = this;

    for (let i = 0; i < suites.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        deck.push(new Card(suites[i], ranks[j], ranks[j] + suites[i], faces[0], rankValues[j]));
        riggedDeck.push(new Card(suites[i], ranks[j], ranks[j] + suites[i], faces[0], rankValues[j]));
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

  getRiggedDeck() {
    return this.riggedDeck;
  }
  
  getHands() {
    return this.hands;
  }

  getRiggedHands() {
    return this.riggedHands;
  }

  getHandArr() {
    return this.handArr;
  }

  getRiggedHandArr1() {
    return this.riggedHandArr1;
  }
  getRiggedHandArr2() {
    return this.riggedHandArr2;
  }
  getRiggedHandArr3() {
    return this.riggedHandArr3;
  }
  getRiggedHandArr4() {
    return this.riggedHandArr4;
  }
}