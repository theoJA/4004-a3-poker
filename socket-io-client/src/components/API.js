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

function postAiStrategies(strategyObj) {
  socket.emit("PostAiStrategies", strategyObj);
}

function postGameOptions({opponent, numOpponents}) {
  socket.emit("GameOptions", {opponent, numOpponents});
}

export {
  getPlayerMessage,
  getHumanPlayerJoined,
  postGameOptions,
  postAiStrategies
};