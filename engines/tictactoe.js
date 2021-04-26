const fetch = require("node-fetch");
const config = require("../utils/config");
const run = require("../utils/masterLooper");

//Plays a completely random (possibly illegal) move
const playRandomMove = (gameId) => {
  console.log(`[${gameId}]: playing random move...`);
  return fetch(`${config.HOST}/api/tictactoe/${gameId}/play`, {
    method: "POST",
    body: JSON.stringify({
      token: config.TOKEN,
      x: Math.floor(Math.random() * 2.8),
      y: Math.floor(Math.random() * 2.8),
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

module.exports = () =>
  run("tictactoe", async (gameId, gameState) => {
    // you can just use the gamestate.board to decide what to do!
    await playRandomMove(gameId);
  });
