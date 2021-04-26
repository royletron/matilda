const run = require("../utils/masterLooper");
const playMove = require("../utils/playMove");

const GAMETYPE = "tictactoe";

module.exports = () =>
  run(GAMETYPE, async (gameId, gameState) => {
    // you can just use the gamestate.board to decide what to do!
    await playMove(gameId, GAMETYPE, {
      x: Math.floor(Math.random() * 2.8),
      y: Math.floor(Math.random() * 2.8),
    });
  });
