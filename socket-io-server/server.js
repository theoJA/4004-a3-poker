const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const port = process.env.PORT || 4001;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

// -----------------------------------------------------------------

const GameSession = require('./models/GameSession');
const Player = require('./models/Player');

let numOpponents = null;
let maxPlayers = null;
let opponent = null;
let humanPlayers = [];
let aiPlayers = [];
let players = []; // human players + ai players


// --------------- CONNECTION -----------------------------------------
io.on("connection", socket => {

  console.log("New player connected");

  // adding player 1, the main player
  if (humanPlayers.length === 0) {
    welcomePlayerOne(socket);
    let player = new Player("You", "Human", "None");
    humanPlayers.push(player);
  }

  // adding other human players
  if (opponent === 'Human') {
    if (humanPlayers.length > 0 && humanPlayers.length < maxPlayers ) {
      welcomeOtherPlayers(socket);
      let player = new Player(humanPlayers.length, "Human", "None");
      humanPlayers.push(player);
      humanPlayerJoined(socket);
      console.log(`max players is ${maxPlayers}`)
    }
    else {
      maxPlayersMessage(socket);
    }
  }

  getGameOptions(socket);   // whenever player 1 has set what opponent to fight
  getAiStrategies(socket);  // whenever player 1 has set ai strategies, if ai is the opponent

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    opponent = null;
    humanPlayers.pop();
  });
});
// -----------------------------------------------------------------------


// ---------------- ON FUNCTIONS -------------------------------------
const getGameOptions = socket => {
  socket.on("GameOptions", data => {
    // resetting the aiPlayers and players
    aiPlayers = [];
    players = [];
    // setting number of opponents
    numOpponents = data.numOpponents;
    // setting max players
    maxPlayers = parseInt(numOpponents) + 1;
    // setting opponent type, Human or Ai
    opponent = data.opponent;
    if (opponent === 'Human') {
      console.log(`Here in the server, waitng for ${numOpponents} human players to join`);
    }
    else if (opponent === 'AI') {
      console.log(`Here in the server, waitng for ${numOpponents} AI players to be set up`);
    }
  });
}

const getAiStrategies = socket => {
  socket.on("PostAiStrategies", data => {
    // extracting keys from data obj
    let tempAiKeys = Object.keys(data);
    let tempPlayers = [];
    // pushing each ai into the ai array
    tempAiKeys.map(ai => {
      let aiPlayer = new Player(ai, "AI", data[ai]);
      aiPlayers.push(aiPlayer);
    });
    // combining ai array with human array, ai first
    tempPlayers = aiPlayers.concat(humanPlayers);
    players = tempPlayers
    console.log(players);
  });
}
// -------------------------------------------------------------------------------


// ---------------- EMIT FUNCTIONS -----------------------------------
const welcomePlayerOne = socket => {
  socket.emit("PlayerMessage", 'WELCOME, PLAYER 1!');
};
const welcomeOtherPlayers = socket => {
  socket.emit("PlayerMessage", `WELCOME, OTHER PLAYER!`);
};
const maxPlayersMessage = socket => {
  socket.emit("PlayerMessage", 'UNABLE TO JOIN! MAX PLAYERS REACHED! ☹');
} 

const humanPlayerJoined = socket => {
  let humansJoined = parseInt(humanPlayers.length) - 1;
  let data = {
    humansJoined, 
    message: `${humansJoined} human(s) have joined`
  };
  socket.emit("HumanPlayerJoined", data);
}
// ------------------------------------------------------------------------


server.listen(port, () => console.log(`Listening on port ${port}`));