const fetch = require("node-fetch");
const config = require("./config");
const logger = require("./logger");

//Plays a completely random (possibly illegal) move
const playMove = (gameId, gameType, move) => {
  logger.info("Playing move...", gameId);
  return fetch(`${config.HOST}/api/${gameType}/${gameId}/play`, {
    method: "POST",
    body: JSON.stringify({
      token: config.TOKEN,
      ...move,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

module.exports = playMove;
