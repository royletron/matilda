const fetch = require("node-fetch");
const config = require("./config");

//Gets the state of the current game.
const getState = (gameId, gameType) => {
  return fetch(`${config.HOST}/api/${gameType}/${gameId}`, {
    method: "POST",
    body: JSON.stringify({
      token: config.TOKEN,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

module.exports = getState;
