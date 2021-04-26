const fetch = require("node-fetch");
const config = require("./config");

//Gets a new game from the lobby
const getGame = (game = "tictactoe") => {
  console.log("INITIALISING NEW GAME");
  return fetch(`${config.HOST}/api/${game}/lobby`, {
    method: "POST",
    body: JSON.stringify({
      token: config.TOKEN,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

module.exports = getGame;
