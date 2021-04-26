const run = require("./utils/masterLooper");
const playMove = require("./utils/playMove");

const GAMETYPE = "tictactoe";

run(GAMETYPE, async (gameId, gameState) => {
  // you can just use the gamestate.board to decide what to do!
  // then generate your move
  const move = {
    x: Math.floor(Math.random() * 2.8),
    y: Math.floor(Math.random() * 2.8),
  };
  // for connect4 { col: Math.floor(Math.random() * 6) }
  // and play it.
  await playMove(gameId, GAMETYPE, move);
});
