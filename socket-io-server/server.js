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

const numPlayers = null;
const players = [];

const maxPlayers = 4;

// --------------- ON CONNECTION -----------------------------------------

io.on("connection", socket => {

  console.log("New player connected");

  if (players.length === 0) {
    welcomePlayerOne(socket);
    let player = new Player(players.length, "human", 0);
    players.push(player);
  }
  else if (players.length > 0 && players.length < 4 ) {
    welcomeOtherPlayers(socket);
    let player = new Player(players.length, "human", 0);
    players.push(player);
  }
  else {
    maxPlayersMessage(socket);
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    players.pop();
  });
});

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


// ------------------------------------------------------------------------
server.listen(port, () => console.log(`Listening on port ${port}`));