import React, { Component } from "react";
import { getPlayerMessage, getHumanPlayerJoined, getPlayersForGame, 
  postGameOptions, postAiStrategies, exchangeCards, getNewCards, getHumanPlayersForGame } from "./components/API";
import { ModalRenderer, GameRenderer } from "./components/GameModals";
import "./App.css";

const HandSolver = require('pokersolver').Hand;

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerId: "you",
      yourDiscards: [],
      playerMessage: false,
      opponent: 'Human',
      numOpponents: '1',
      aiStrategies: {},
      humansJoined: 0,
      gameStatus: "setting game options",
      players: [],
      newCards: null,
      newRiggedCards: "",
      winnerMessage: "",
      riggedHands: [[],[],[],[]]
    };
    this._setOpponent = this._setOpponent.bind(this);
    this._setNumOpponents = this._setNumOpponents.bind(this);
    this._gameOptionsSubmit = this._gameOptionsSubmit.bind(this);
    this._InitPreGameStatus = this._InitPreGameStatus.bind(this);
    this._refreshWaitingForHumans = this._refreshWaitingForHumans.bind(this);
    this._setAiStrategy = this._setAiStrategy.bind(this);
    this._postAiStrategies = this._postAiStrategies.bind(this);
    this._findWinner = this._findWinner.bind(this);
    this._humanDiscarding = this._humanDiscarding.bind(this);
    this._exchangeYourCards = this._exchangeYourCards.bind(this);
    this._getOtherHumanPlayers = this._getOtherHumanPlayers.bind(this);
    this._setRiggedCards = this._setRiggedCards.bind(this);
    this._rigExchangedCards = this._rigExchangedCards.bind(this);
    this._setRigExchangedCards = this._setRigExchangedCards.bind(this);
  }

  // Getting welcome message from the server through socket
  componentDidMount() {
    getPlayerMessage(data =>
      this.setState({
        playerMessage: data
      })
    );
  }

// for rigging purposes
  _setRiggedCards(event) {
    let { riggedHands } = this.state;
    console.log(riggedHands);
    let deckCardIndex = event.target.id;
    deckCardIndex = deckCardIndex.split(''); // [deck, card]
    
    riggedHands[deckCardIndex[0]][deckCardIndex[1]] = event.target.value;
    this.setState({
      riggedHands
    });
  }

// game options modal functions
  _setOpponent(event) {
    this.setState({ opponent: event.target.value});
  }
  _setNumOpponents(event) {
    this.setState({ numOpponents: event.target.value });
  }

  _gameOptionsSubmit() {
    let { opponent, numOpponents } = this.state;
    // send game options to the server
    postGameOptions({opponent, numOpponents});
    // display either the human or AI modal here
    if (opponent === 'Human') {
      this.setState({ playerNum: 1, gameStatus: "waiting for human players" }); 
    }
    else if (opponent === 'AI') {
      this.setState({ playerNum: 1, gameStatus: "setting up ai players" }); 
    }
  }

// ai modal controls 
  _setAiStrategy(event) {
    let { aiStrategies } = this.state;
    let tempAiStrategies = aiStrategies;
    tempAiStrategies[event.target.id] = event.target.value;
    this.setState({
      aiStrategies: tempAiStrategies
    });
  }

  _postAiStrategies() {
    // posting the strategies to the server
    let { aiStrategies, riggedHands } = this.state;
    postAiStrategies([aiStrategies, riggedHands]);
    // getting the players in the right order from the server
    getPlayersForGame(data => {
      console.log(data);
      this.setState({
        players: data,
        gameStatus: "game started"
      })
    });
  }
// ----------------------------

  _getOtherHumanPlayers() {
    console.log('trying to get other human players');
    getHumanPlayersForGame(data => {
      console.log(data);
      this.setState({
        players: data,
        gameStatus: "game started"
      })
    });
  }


// NOT REALLY WORKING!---------
  _refreshWaitingForHumans() {
    console.log("refreshing")
    getHumanPlayerJoined(data => 
      this.setState({
        humansJoined: data.humansJoined
      })
    );
  }
// ----------------------------


  _InitPreGameStatus() {
    this.setState({ 
      gameStatus: "setting game options", 
      opponent: 'Human', 
      numOpponents: '1',
      aiStrategies: {},
    });
  }


  _renderGameOptions() { 
    return (
      <ModalRenderer
        setRiggedCards={this._setRiggedCards}
        postAiStrategies={this._postAiStrategies}
        setAiStrategy={this._setAiStrategy}
        refreshWaitingForHumans={this._refreshWaitingForHumans}
        humansJoined={this.state.humansJoined}
        numOpponents={this.state.numOpponents}
        gameStatus={this.state.gameStatus}
        setOpponent={this._setOpponent}
        setNumOpponents={this._setNumOpponents}
        gameOptionsSubmit={this._gameOptionsSubmit}
        initPreGameStatus={this._InitPreGameStatus}
        getOtherHumanPlayers={this._getOtherHumanPlayers}
      />
    );
  }

_renderStartGame() {
  return (
    <GameRenderer 
      setRigExchangedCards={this._setRigExchangedCards}
      rigExchangedCards={this._rigExchangedCards}
      winner={this.state.winner}
      winnerMessage={this.state.winnerMessage}
      exchangeYourCards={this._exchangeYourCards}
      humanDiscarding={this._humanDiscarding}
      findWinner={this._findWinner}
      playerId={this.state.playerId}
      playersInGame={this.state.players}
    />
  );
}

_setRigExchangedCards(event) {
  this.setState({
    newRiggedCards: event.target.value
  })
}

_rigExchangedCards(event) {
  //event.target.id is = to players index
  let { players, newRiggedCards } = this.state;
  let newCards = newRiggedCards.split(","); 
  players[event.target.id].hand.forEach((card,index) => {
    if (card.face === "faceup") {
      let newCard = newCards.pop();
      card.suite = newCard.split("")[1];
      card.rank = newCard.split("")[0];
      card.name = newCard;
    }
  });
  this.setState({
    players
  });
}

_pageRenderer() {
  if (this.state.playerMessage === "WELCOME, PLAYER 1!") {
    
    if (this.state.gameStatus !== "game started") {
      return (this._renderGameOptions());
    }
    else {
      return (this._renderStartGame());
    }
  }
  else if (this.state.playerMessage === "WELCOME, OTHER PLAYER!") {  
    if (this.state.gameStatus === "game started")
      console.log('ready to print other players ui');
  }
}

_humanDiscarding(event) {
  let { yourDiscards } = this.state;

  if (!yourDiscards.includes(event.target.id)) {
    yourDiscards.push(event.target.id);
  }
  else {
    yourDiscards.splice(yourDiscards.indexOf(event.target.id), 1);
  }
  console.log(yourDiscards);
  this.setState({
    yourDiscards
  });
}

_exchangeYourCards() {
  exchangeCards(this.state.yourDiscards.length);
  getNewCards(data => {
    this.setState({
      newCards: data
    })
    this._findWinner()
  });
}

_findWinner() {
  let { newCards, players, yourDiscards } = this.state;
  console.log('this is the new cards: ', newCards);
  // if main player exchanged any cards, we set it here
  if (newCards !== null) {
    console.log(players[players.length - 1])
    
    yourDiscards.forEach((discInd, index) => {
      players[players.length - 1].hand[discInd] = newCards[index]; 
    });

    console.log(players[players.length - 1])  
  }

  let handsArr = [];
  let tempWinner, winningIndex;
  // grab the names of each card in each player's hand
  players.forEach((player,index) => {
    let handsWithNames = [];
    player.hand.forEach((card,index) => {
      handsWithNames.push(card.name);
    });
    handsArr.push(handsWithNames);
  });

  handsArr.forEach((hand,index) => {
    handsArr[index] = HandSolver.solve(hand).rank;
    console.log(handsArr[index], HandSolver.solve(hand).name);
  });

  let max = handsArr.reduce(function(a, b) {
    return Math.max(a, b);
  });

  winningIndex = handsArr.indexOf(max);

  if (handsArr[winningIndex] === handsArr[winningIndex+1]) {
    winningIndex = parseInt(winningIndex) + 1;
  }

  tempWinner = players[winningIndex].id;

  console.log(tempWinner);
  let tempWinnerMessage = `${tempWinner} WON!`
  
  this.setState({
    players,
    winnerMessage: tempWinnerMessage
  });
}

  render() {
    const { playerMessage } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          {playerMessage ? <p>{playerMessage}</p> : <p>LOADING...</p>}
        </div>
        <div>{this._pageRenderer()}</div>
      </div>
    );
  }
}

export default App;
