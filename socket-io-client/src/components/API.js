import openSocket from "socket.io-client";

const socket = openSocket('http://localhost:4001');

function getPlayerMessage(cb) {
  socket.on("PlayerMessage", data => cb(data));
};

export {
  getPlayerMessage,
};