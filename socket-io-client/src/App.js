import React, { Component } from "react";
import { getPlayerMessage } from "./components/API";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      gameMessage: null,
      opponent: 'human',
      numOpponent: '1'
    };

    this._setOpponent = this._setOpponent.bind(this);
    this._setNumOpponents = this._setNumOpponents.bind(this);
    this._gameOptionsSubmit = this._gameOptionsSubmit.bind(this);
  }

  // Getting welcome message from the server through socket
  componentDidMount() {
    getPlayerMessage(data =>
      this.setState({
        response: data
      })
    );
  }

// game options form functions
  _setOpponent(event) {
    this.setState({ opponent: event.target.value });
  }
  _setNumOpponents(event) {
    this.setState({ numOpponent: event.target.value });
  }
  _gameOptionsSubmit() {
    alert(`You will be going against ${this.state.numOpponent} ${this.state.opponent} player(s)`);
  }
// -----------------------------------

// game options modal
  _renderGameOptions() {
    if (this.state.response === "WELCOME, PLAYER 1!") {
      return (
        <div>
          <button className="uk-button uk-button-primary uk-button-default" style={{margin: 20}} uk-toggle="target: #my-id" type="button">Set Game</button>
          
          <div id="my-id" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Set the following options</h2>

              <div>
                <form id="game-options">
                  <fieldset className="uk-fieldset">
                  
                    <legend className="uk-legend">Opponent</legend>
                    <div className="uk-margin">
                      <select className="uk-select" onChange={this._setOpponent}>
                        <option>Human</option>
                        <option>AI</option>
                      </select>
                    </div>

                    <legend className="uk-legend">Number of Opponents</legend>
                    <div className="uk-margin">
                      <select className="uk-select" onChange={this._setNumOpponents}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>

                  </fieldset>
                </form>
              </div>

              <button className="uk-button uk-button-danger uk-modal-close" type="submit" onClick={this._gameOptionsSubmit}>
                Start Game
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
// ------------------------------------------


  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          {response ? <p>{response}</p> : <p>Loading...</p>}
        </div>
        <div>{this._renderGameOptions()}</div>
      </div>
    );
  }
}

export default App;
