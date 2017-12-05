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
let players = [];

// --------------- ON CONNECTION -----------------------------------------

io.on("connection", socket => {

  console.log("New player connected");

  if (players.length === 0) {
    welcomePlayerOne(socket);
    let player = new Player(players.length, "human", 0);
    players.push(player);
  }

  console.log(`the opponent is a ${opponent}`);

  if (opponent === 'human') {
    if (players.length > 0 && players.length < maxPlayers ) {
      welcomeOtherPlayers(socket);
      let player = new Player(players.length, "human", 0);
      players.push(player);
      humanPlayerJoined(socket);
      console.log(`max players is ${maxPlayers}`)
    }
    else {
      maxPlayersMessage(socket);
    }
  }

  getGameOptions(socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    opponent = null;
    players.pop();
  });
});

// ---------------- ON FUNCTIONS -------------------------------------
const getGameOptions = socket => {
  socket.on("GameOptions", data => {
    // setting number of opponents
    numOpponents = data.numOpponents;
    // setting max players
    maxPlayers = parseInt(numOpponents) + 1;
    // setting opponent type, Human or Ai
    opponent = data.opponent;
    console.log(`Here in the server, waitng for ${numOpponents} human players to join`);
  });
}

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
  let humansJoined = parseInt(players.length) - 1;
  let data = {
    humansJoined, 
    message: `${humansJoined} human(s) have joined`
  };
  socket.emit("HumanPlayerJoined", data);
}


// ------------------------------------------------------------------------
server.listen(port, () => console.log(`Listening on port ${port}`));