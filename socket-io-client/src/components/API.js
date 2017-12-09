import openSocket from "socket.io-client";

const socket = openSocket('http://localhost:4001');

function getPlayerMessage(cb) {
  socket.on("PlayerMessage", data => cb(data));
};

// NOT WORKING -------------------------
function getHumanPlayerJoined(cb) {
  console.log('receiving data');
  socket.on("HumanPlayerJoined", data => {
    console.log(data);
    cb(data)});
  console.log('received data');
}
// -------------------------------------

function getPlayersForGame(cb) {
  console.log('in the api')
  socket.on("PlayersForGame", data => cb(data));
}

function getHumanPlayersForGame(cb) {
  socket.on("HumanPlayersForGame", data => cb(data));
}

function getNewCards(cb) {
  socket.on("GetNewCards", data => cb(data));
}


function exchangeCards(amount) {
  socket.emit("ExchangeCards", amount);
}

function postAiStrategies([strategyObj, riggedHands]) {
  socket.emit("PostAiStrategies", [strategyObj, riggedHands]);
}

function postGameOptions({opponent, numOpponents}) {
  socket.emit("GameOptions", {opponent, numOpponents});
}

export {
  getPlayerMessage,
  getHumanPlayerJoined,
  getPlayersForGame,
  getHumanPlayersForGame,
  postGameOptions,
  postAiStrategies,
  exchangeCards,
  getNewCards
};