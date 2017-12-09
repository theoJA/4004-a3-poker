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
const Card = require('./models/Card');
const Deck = require('./models/Deck');

let numOpponents = null;
let maxPlayers = null;
let opponent = null;
let humanPlayers = [];
let aiPlayers = [];
let humanOpponents = [];
let players = []; // human players + ai players
let gameSession;
let deck;
let newCards;

// --------------- CONNECTION -----------------------------------------
io.on("connection", socket => {
  
  console.log("New player connected");
  
  // adding player 1, the main player
  if (humanPlayers.length === 0) {
    welcomePlayerOne(socket);
    let player = new Player("You", "Human", null, "None");
    humanPlayers.push(player);
  }

  // adding other human players
  if (opponent === 'Human') {
    if (humanPlayers.length > 0 && humanOpponents.length < numOpponents ) {
      welcomeOtherPlayers(socket);
      let player = new Player('H' + (parseInt(humanOpponents.length)+1), "Human", null, "None");
      humanOpponents.push(player);
      //console.log(`max players is ${maxPlayers}`)
      console.log(humanOpponents);
    }
    else {
      maxPlayersMessage(socket);
    }
  }
  
  if (humanOpponents.length === numOpponents) {
    console.log('theres enough humans now')
    // broadcast players to everyone and emit players to main human
    players = humanOpponents.concat(humanPlayers);
    deck = new Deck();
    gameSession = new GameSession(deck.getRiggedDeck() ,deck.getRiggedHands(), deck.getRiggedHandArr(), maxPlayers, players);
    players = gameSession.getPlayers();
    // 
    console.log('ready to emit..')
  }
  
  io.emit("HumanPlayersForGame", humanOpponents);
  getGameOptions(socket);   // whenever player 1 has set what opponent to fight
  //humanPlayerJoined(socket);
  getAiStrategies(socket);  // whenever player 1 has set ai strategies, if ai is the opponent
  exchangeCards(socket);

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
    let tempStratObj = data[0];
    let tempAiKeys = Object.keys(tempStratObj);
    let tempPlayers = [];
    console.log('strratobj',tempStratObj);
    // pushing each ai into the ai array
    tempAiKeys.map(ai => {
      console.log('ai key is: ', ai);
      let aiPlayer = new Player(ai, "AI", null, tempStratObj[ai]);
      aiPlayers.push(aiPlayer);
    });
    // combining ai array with human array, ai first
    tempPlayers = aiPlayers.concat(humanPlayers);
    players = tempPlayers;
    // creates a new deck object and creating the deck and the hands for players
    deck = new Deck(data[1]);
    // Now that all players are present, deck and hands are created, a new game session is created
    // The entire game is conducted in this class
    gameSession = new GameSession(deck.getRiggedDeck() ,deck.getRiggedHands(), deck.getRiggedHandArr1(), maxPlayers, players);
    // Now that AI players have performed their moves, and possibly get new visible hands/cards, 
    //  we can send the players at an interval to the client just to slow down the rendering of
    //  the UI on the client side (to make it look like the AI is moving in sequence)
    
    // at this point we should get the players array that has already gone through the game
    players = gameSession.getPlayers();
    sendPlayersToClient(socket);  // --> Here's where we send the players with their respective hands
  });
}

const exchangeCards = socket => {
  socket.on("ExchangeCards", data => {
    newCards = gameSession.grabNewCards(parseInt(data));

    // we have to use io.sockets.emit because socket is already being used and can 
    //  only listen to one emit at a time
    io.sockets.emit("GetNewCards", newCards);
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
  io.sockets.emit("HumanPlayerJoined", data);
}

const sendHumanPlayersToClient = socket => {
  io.sockets.emit("HumanPlayersForGame", players);
}

const sendPlayersToClient = socket => {
  socket.emit("PlayersForGame", players);
}
// ------------------------------------------------------------------------


server.listen(port, () => console.log(`Listening on port ${port}`));