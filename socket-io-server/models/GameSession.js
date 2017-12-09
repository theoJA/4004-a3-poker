const Strategy1 = require('../strategies/Strategy1');
const HandSolver = require('pokersolver').Hand;
const Card = require('../models/Card');

let cRank = "Two Pairs";
let anotherRank = "Three of A Kind";
let aTempRank = "Full House";
let tempRank = "High Card";
let tempRanks = "Pair";
module.exports = class GameSession {

  constructor( usedDeck, hands, handArr, numPlayers, players ) {
    this.maxPlayers = 4;
    this.usedDeck = usedDeck;
    this.hands = hands;
    this.handArr = handArr;
    this.numPlayers = numPlayers;
    this.players = players; // this will be an array of players
    
    this.visibleCardArr = [];
    this.riggedNewCardsStrategy1 = {
      nothing: [],
      aPair: [],
      makesAFullHouse: [],
    }

    this.riggedNewCardsStrategy2 = {
      notThreeOfAKind: [],
      threeOfAKind: [],
    }

    this.initRiggedNewCardsStrategy1();
    this.initRiggedNewCardsStrategy2();
    this.giveHandToEachPlayer();
    this.aiPlayersMakeMove();
  }

  initRiggedNewCardsStrategy1() {
    this.riggedNewCardsStrategy1.nothing.push(new Card('d','5','5d','faceup','5'));
    this.riggedNewCardsStrategy1.aPair.push(new Card('h','6','6h','faceup','6'));
    this.riggedNewCardsStrategy1.aPair.push(new Card('d','6','6d','faceup','6'));
    this.riggedNewCardsStrategy1.makesAFullHouse.push(new Card('c','J','Jc','faceup','11'));   
  }

  initRiggedNewCardsStrategy2() {
    this.riggedNewCardsStrategy2.notThreeOfAKind.push(new Card('c','4','4c','faceup','4'));
    this.riggedNewCardsStrategy2.notThreeOfAKind.push(new Card('s','6','6s','faceup','6'));
    this.riggedNewCardsStrategy2.notThreeOfAKind.push(new Card('s','2','2s','faceup','2'));

    this.riggedNewCardsStrategy2.threeOfAKind.push(new Card('d','Q','Qd','faceup','12'));
    this.riggedNewCardsStrategy2.threeOfAKind.push(new Card('h','Q','Qh','faceup','12'));
    this.riggedNewCardsStrategy2.threeOfAKind.push(new Card('c','Q','Qc','faceup','12'));
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

  grabNewCards(amount) {
    let randIndex, tempCard; 
    let newCards = [];
    for(let i = 0; i<amount; i++) {
      randIndex = Math.floor(Math.random(0,this.usedDeck.length) * this.usedDeck.length);
      tempCard = this.usedDeck.splice(randIndex,1)[0];
      newCards.push(tempCard);
    }
    return newCards;
  }

  giveHandToEachPlayer() {
    let { players, hands, handArr } = this;
    players.forEach((player, index) => {
      player.setHand(hands[handArr[index]]);      
    }); 
  }

  aiPlayersMakeMove() {
    let { players, hands, handArr } = this;
    let visibleCardsRank;

    // going through each ai player
    players.forEach((player,index) => {

      if (player.getType() === "AI") {
        if (index === 0) {
          console.log('player 1 goes here');
          this.useStrategy1(player);
        }
  
        else {
          console.log('other players go here');
          // next ai player uses strategy 1
          if (player.getStrategy() === "Strategy 1") {
            this.useStrategy1(player);
          }
  
          // next ai player uses strategy 2
          else if (player.getStrategy() === "Strategy 2") {
            console.log('other players go in here now');
            // now we have to go through the array of visible cards, see if theres a VISIBLE, 3 OF A KIND
            this.visibleCardArr.forEach(cardArr => {
              let cardNamesArr = [];
              cardArr.forEach(card => {
                cardNamesArr.push(card._getName());
              });
              let tempRank = HandSolver.solve(cardNamesArr);
              console.log('this is the rankkkk',tempRank.name, this.visibleCardArr);
              if (tempRank.name === "Three of a Kind" || visibleCardsRank === tempRank || visibleCardsRank === tempRanks ) {
                visibleCardsRank = "Three of a Kind";
              }
            });
    
            console.log('the visible card ranks is: ', visibleCardsRank);
            if (anotherRank === "Three of a Kind") {
              this.useStrategy2(player);
            }
            else {
              this.useStrategy1(player);
            }
          }
        }
      }    
    });
    console.log('all visible cards: ', this.visibleCardArr);
  }

  useStrategy1(player) {
    let { players, hands, handArr } = this;
    let randIndex, tempCard;

    let tempVisibleCards = [];
    let strategy1 = new Strategy1(player.getHand());
    let tempHand = strategy1.getHand();

    // exchanges discarded cards for legit cards
    tempHand.forEach((card, index) => {
      if (card === 'remove') {
        randIndex = Math.floor(Math.random(0,this.usedDeck.length) * this.usedDeck.length);
        tempCard = this.usedDeck.splice(randIndex,1);
        tempCard[0]._setFace('faceup'); 
        tempHand[index] = tempCard[0];
        tempVisibleCards.push(tempCard[0]);
      }
    });

    // // exchanges discarded cards for rigged cards. Probably bribed the dealer. Will go to jail. Bad. Bad boye. Go to jail.    
    // let riggedHandInd = 0
    // tempHand.forEach((card, index) => {
    //   if (card === 'remove') {
    //     tempHand[index] = this.riggedNewCardsStrategy2.threeOfAKind[riggedHandInd];
    //     riggedHandInd++;
    //     tempVisibleCards.push(tempHand[index]);
    //   }
    // });
    // storing the array of visible cards for this player
    this.visibleCardArr.push(tempVisibleCards);

    player.setHand(tempHand);
    console.log(player.getId(), player.getStrategy(), player.getHand());
  }


  useStrategy2(player) {
    let { players, hands, handArr } = this;
    let randIndex, tempCard;

    let tempVisibleCards = [];
    let strategy1 = new Strategy1(player.getHand());
    let tempHand = strategy1.getHand();

    // exchanges discarded cards for legit cards
    tempHand.forEach((card, index) => {
      if (card === 'remove') {
        randIndex = Math.floor(Math.random(0,this.usedDeck.length) * this.usedDeck.length);
        tempCard = this.usedDeck.splice(randIndex,1);
        tempCard[0]._setFace('faceup'); 
        tempHand[index] = tempCard[0];
        tempVisibleCards.push(tempCard[0]);
      }
    });

    // // exchanges discarded cards for rigged cards. Probably bribed the dealer. Will go to jail. Bad. Bad boye. Go to jail.    
    // let riggedHandInd = 0
    // tempHand.forEach((card, index) => {
    //   if (card === 'remove') {
    //     tempHand[index] = this.riggedNewCardsStrategy2.notThreeOfAKind[riggedHandInd];
    //     riggedHandInd++;
    //     tempVisibleCards.push(tempHand[index]);
    //   }
    // });

    // storing the array of visible cards for this player
    this.visibleCardArr.push(tempVisibleCards);

    player.setHand(tempHand);
    console.log(player.getId(), player.getStrategy(), player.getHand());
  }

}
