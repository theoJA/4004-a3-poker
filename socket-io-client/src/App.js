import React, { Component } from "react";
import { getPlayerMessage, getHumanPlayerJoined, getPlayersForGame, postGameOptions, postAiStrategies } from "./components/API";
import { ModalRenderer, GameRenderer } from "./components/GameModals";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerNum: 0,
      playerMessage: false,
      opponent: 'Human',
      numOpponents: '1',
      aiStrategies: {},
      humansJoined: 0,
      gameStatus: "setting game options",
      players: {}
    };
    this._setOpponent = this._setOpponent.bind(this);
    this._setNumOpponents = this._setNumOpponents.bind(this);
    this._gameOptionsSubmit = this._gameOptionsSubmit.bind(this);
    this._InitPreGameStatus = this._InitPreGameStatus.bind(this);
    this._refreshWaitingForHumans = this._refreshWaitingForHumans.bind(this);
    this._setAiStrategy = this._setAiStrategy.bind(this);
    this._postAiStrategies = this._postAiStrategies.bind(this);
  }

  // Getting welcome message from the server through socket
  componentDidMount() {
    getPlayerMessage(data =>
      this.setState({
        playerMessage: data
      })
    );
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
    }, () => {
      console.log(aiStrategies);
    });
  }

  async _postAiStrategies() {
    // posting the strategies to the server
    await postAiStrategies(this.state.aiStrategies);
    // getting the players in the right order from the server
    getPlayersForGame(data =>
      this.setState({
        players: data,
        gameStatus: "game started"
      })
    );
  }
// ----------------------------




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
      />
    );
  }

_renderStartGame() {
  return (
    <GameRenderer 
      playersInGame={this.state.players}
    />
  );
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
