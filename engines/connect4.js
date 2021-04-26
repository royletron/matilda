const fetch = require("node-fetch");
const config = require("../utils/config");
const run = require("../utils/masterLooper");

//Plays a completely random (possibly illegal) move
const playRandomMove = (gameId) => {
  console.log(`[${gameId}]: playing random move...`);
  return fetch(`${config.HOST}/api/connect4/${gameId}/play`, {
    method: "POST",
    body: JSON.stringify({
      token: config.TOKEN,
      col: Math.floor(Math.random() * 6),
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

module.exports = () =>
  run("connect4", async (gameId, gameState) => {
    // you can just use the gamestate.board to decide what to do!
    await playRandomMove(gameId);
  });
