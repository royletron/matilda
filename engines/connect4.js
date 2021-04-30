const run = require("../utils/masterLooper");
const playMove = require("../utils/playMove");

const GAMETYPE = "connect4";

module.exports = () =>
  run(GAMETYPE, async (gameId, gameState) => {
    // you can just use the gamestate.board to decide what to do!
    await playMove(gameId, GAMETYPE, { col: Math.floor(Math.random() * 7) });
  });
