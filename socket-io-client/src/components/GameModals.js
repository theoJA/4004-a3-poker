import React from 'react';
import './GameModals.css';

function ModalRenderer(props) {

  let aiDropdowns = [];

  switch (props.gameStatus) {

    case "setting game options": {
      return (
        <div>
          <button id="setGameOptions" className="uk-button uk-button-primary uk-button-default" style={{margin: 20}} uk-toggle="target: #game-option-modal" type="button">Set Game</button>         
          <div id="game-option-modal" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Set the following options</h2>  
              <div>
                <form id="game-options">
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">Opponent</legend>
                    <div className="uk-margin">
                      <select id="selectOpponent" className="uk-select" onChange={props.setOpponent}>
                        <option id="humanOpponent">Human</option>
                        <option id="aiOpponent">AI</option>
                      </select>
                    </div>
                    <legend id="numOfOpponents" className="uk-legend">Number of Opponents</legend>
                    <div className="uk-margin">
                      <select className="uk-select" onChange={props.setNumOpponents}>
                        <option id="1Opponents">1</option>
                        <option id="2Opponents">2</option>
                        <option id="3Opponents">3</option>
                      </select>
                    </div>
                  </fieldset>
                </form>
              </div>
              <button id="sendGameOptions" className="uk-button uk-button-primary" type="submit" onClick={props.gameOptionsSubmit}>
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }

    case "waiting for human players": {
      return (
        <div>
          <button className="uk-button uk-button-primary uk-button-default" style={{margin: 20}} uk-toggle="target: #game-option-modal" type="button">Set Game</button>         
          <div id="game-option-modal" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Waiting for {props.numOpponents} player(s) to join...</h2>  
              <h4 className="uk-modal-title">{props.humansJoined} player(s) joined</h4> 
              <button className="uk-button uk-button-primary uk-margin-left" onClick={props.initPreGameStatus}>
                Back
              </button>
              <button className="uk-button uk-button-secondary uk-margin-left" onClick={props.refreshWaitingForHumans}>
                Refresh
              </button>
              <button className="uk-button uk-button-danger uk-modal-close uk-margin-left" onClick={props.getOtherHumanPlayers}>
                Start Game
              </button>
            </div>
          </div>
        </div>
      );
    }

    case "setting up ai players": {
      for (let i = 0; i < props.numOpponents; i++) {
        aiDropdowns.push(
          <div className="uk-margin uk-flex uk-flex-wrap uk-flex-wrap-around uk-text-center" key={i}>
            <div className="uk-background-muted uk-width-1-5 uk-margin-left">{'AI ' + (i+1)}</div>
            <select id={'AI' + (i+1)} className="uk-select uk-width-1-2 uk-margin-left" onClick={props.setAiStrategy}>
              <option>  - </option>
              <option id={'Strat1AI' + (i+1)} >Strategy 1</option>
              <option id={'Strat2AI' + (i+1)} >Strategy 2</option>
            </select>
            <input id={i + '0'} className="uk-input" type="text" placeholder="Input" onChange={props.setRiggedCards}/>
            <input id={i + '1'} className="uk-input" type="text" placeholder="Input" onChange={props.setRiggedCards}/>
            <input id={i + '2'} className="uk-input" type="text" placeholder="Input" onChange={props.setRiggedCards}/>
            <input id={i + '3'} className="uk-input" type="text" placeholder="Input" onChange={props.setRiggedCards}/>
            <input id={i + '4'} className="uk-input" type="text" placeholder="Input" onChange={props.setRiggedCards}/>
          </div>
        );  
      }
      return (
        <div>
          <button className="uk-button uk-button-primary uk-button-default" style={{margin: 20}} uk-toggle="target: #game-option-modal" type="button">Set Game</button>         
          <div id="game-option-modal" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Select strategies for each AI player</h2>  
              
                {aiDropdowns && (
                  <div>
                  {
                    aiDropdowns.map(dropdown => {
                      return dropdown;
                    })
                  }
                  </div>
                )}
                
              <button className="uk-button uk-button-primary uk-margin-left" onClick={props.initPreGameStatus}>
                Back
              </button>
              <button id="startGameAI" className="uk-button uk-button-danger uk-modal-close uk-margin-left" type="submit" onClick={props.postAiStrategies}>
                Start Game
              </button>
            </div>
          </div>
        </div>
      );
    }

    default: return;
  }
}


function GameRenderer(props) {

  function yourCardsRenderer(hand) {
    let handUi = [];
    hand.forEach((card,index) => {
      handUi.push(
        <div key={card.name} id="faceup-card">
          <p>{card.name}</p>
          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input id={index} className="uk-checkbox" type="checkbox" onChange={props.humanDiscarding} />{index} </label>
          </div>
        </div>
      );  
    });
    return handUi;
  }

  function opponenetCardsRenderer(hand) {
    let handUi = [];
    hand.forEach((card,index) => {
      if (card.face === "facedown") {
        handUi.push(
          <div key={card.name} id="facedown-card">
            <p>{'??'}</p>
          </div>
        )
      }
      else if ((card.face === "faceup")) {
        handUi.push(
          <div key={card.name} id="faceup-card">
            <p>{card.name}</p>
          </div>
        )
      }
    });
    return handUi;
  }

  function renderWinner() {
    if (props.winnerMessage === "") {
      return (
        <p></p>
      )
    } else {
      return (
        <p>{props.winnerMessage}</p>
      )
    }
  }

  // holds the ui for each player
  let playersUi = [];

  // holds the player objects
  let playersInGame = props.playersInGame;

  playersInGame.forEach((player,index) => {
    if (player.type === "AI") {
      playersUi.push(
        <div key={player.id + index} className="uk-text-center">
          <div className="uk-button uk-button-secondary disabled">{player.id}</div>
          
          <div id="card-container" className="uk-flex uk-flex-around">
          {
            opponenetCardsRenderer(player.hand).map(cardUi => {
              return cardUi;
            })
          }
          </div>      
          <div>
            <input id={'exchangingInput' + index} className="uk-input" type="text" placeholder="Input" onChange={props.setRigExchangedCards}/>
            <button id={index} className="uk-button uk-button-default uk-margin-bottom uk-margin-left" onClick={props.rigExchangedCards}>Exchange</button>
          </div>
        </div>
      );
    }
    else if (player.type === "Human") {
      playersUi.push(
        <div key={player.id} className="uk-text-center">
          <div className="uk-button uk-button-primary" disabled>{player.id}</div>
          
          <div id="card-container" className="uk-flex uk-flex-center">
          {
            yourCardsRenderer(player.hand).map(cardUi => {
              return cardUi;
            })
          }
          </div>      
          
          <div>
            <button className="uk-button uk-button-default uk-margin-bottom uk-margin-left" onClick={props.exchangeYourCards}>Discard</button>
            <button id="youHold" className="uk-button uk-button-default uk-margin-bottom uk-margin-left" onClick={props.findWinner}>Hold</button>
          </div>
        </div>
      );
    }
  })

  return (
    <div>
      <h2 className="uk-modal-title">The AI players have made their move</h2>  
      {playersUi && (
        <div className="uk-flex uk-flex-center uk-margin-right">
        {
          playersUi.map(player => {
            return player;
          })
        }
        </div>
      )}
      <div>
        { renderWinner() }
      </div>  
      
    </div>
  )
}


export {
  ModalRenderer,
  GameRenderer
};