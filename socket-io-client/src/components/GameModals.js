import React from 'react';

function ModalRenderer(props) {

  let aiDropdowns = [];

  switch (props.preGameStatus) {

    case "setting game options": {
      return (
        <div>
          <button className="uk-button uk-button-primary uk-button-default" style={{margin: 20}} uk-toggle="target: #game-option-modal" type="button">Set Game</button>         
          <div id="game-option-modal" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Set the following options</h2>  
              <div>
                <form id="game-options">
                  <fieldset className="uk-fieldset">
                    <legend className="uk-legend">Opponent</legend>
                    <div className="uk-margin">
                      <select className="uk-select" onChange={props.setOpponent}>
                        <option>Human</option>
                        <option>AI</option>
                      </select>
                    </div>
                    <legend className="uk-legend">Number of Opponents</legend>
                    <div className="uk-margin">
                      <select className="uk-select" onChange={props.setNumOpponents}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </fieldset>
                </form>
              </div>
              <button className="uk-button uk-button-primary" type="submit" onClick={props.gameOptionsSubmit}>
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
              <button className="uk-button uk-button-danger uk-modal-close uk-margin-left" type="submit">
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
              <option>Strategy 1</option>
              <option>Strategy 2</option>
            </select>
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
              <button className="uk-button uk-button-danger uk-modal-close uk-margin-left" type="submit" onClick={props.postAiStrategies}>
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

export {
  ModalRenderer,
};