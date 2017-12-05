import React from 'react';

function ModalRenderer(props) {
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
              <button className="uk-button uk-button-primary" onClick={props.initPreGameStatus}>
                Back
              </button>

              <button className="uk-button uk-button-secondary" onClick={props.refreshWaitingForHumans}>
                Refresh
              </button>

              <button className="uk-button uk-button-danger uk-modal-close" type="submit">
                Start
              </button>
            </div>
          </div>
        </div>
      );
    }

    default: return;
  }
   
}

// function HumanModal(props) {
//   return (
//     <div>
      
//       <div id="human-modal" uk-modal="true">
//         <div className="uk-modal-dialog uk-modal-body">
//           <h2 className="uk-modal-title">Set the following options</h2>

          

//           <button className="uk-button uk-button-danger uk-modal-close" type="submit" onClick={props.gameOptionsSubmit}>
//             Start
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AiModal(props) {

// }


export {
  ModalRenderer,
};