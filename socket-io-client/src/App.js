import React, { Component } from "react";
import { getPlayerMessage, getHumanPlayerJoined, postGameOptions } from "./components/API";
import { ModalRenderer } from "./components/GameModals";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerNum: 0,
      playerMessage: false,
      opponent: 'human',
      numOpponents: '1',
      aiStrategies: [],
      humansJoined: 0,
      preGameStatus: "setting game options"
    };
    this._setOpponent = this._setOpponent.bind(this);
    this._setNumOpponents = this._setNumOpponents.bind(this);
    this._gameOptionsSubmit = this._gameOptionsSubmit.bind(this);
    this._InitPreGameStatus = this._InitPreGameStatus.bind(this);
    this._refreshWaitingForHumans = this._refreshWaitingForHumans.bind(this);
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
    this.setState({ playerNum: 1, preGameStatus: "waiting for human players" }); 
  }

  _refreshWaitingForHumans() {
    console.log("refreshing")
    getHumanPlayerJoined(data => 
      
      this.setState({
        humansJoined: data.humansJoined
      })
    );
  }

  _InitPreGameStatus() {
    this.setState({ preGameStatus: "setting game options", opponent: 'human', numOpponents: '1' });
  }


  _renderGameOptions() { 
    return (
      <ModalRenderer 
        refreshWaitingForHumans={this._refreshWaitingForHumans}
        humansJoined={this.state.humansJoined}
        numOpponents={this.state.numOpponents}
        preGameStatus={this.state.preGameStatus}
        setOpponent={this._setOpponent}
        setNumOpponents={this._setNumOpponents}
        gameOptionsSubmit={this._gameOptionsSubmit}
        initPreGameStatus={this._InitPreGameStatus}
      />
    );
  }



_pageRenderer() {
  if (this.state.playerMessage === "WELCOME, PLAYER 1!") {
    return (this._renderGameOptions());
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
