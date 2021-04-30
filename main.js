const run = require("./utils/masterLooper");
const playMove = require("./utils/playMove");

const GAMETYPE = "connect4";

run(GAMETYPE, async (gameId, gameState) => {
  // you can just use the gamestate.board to decide what to do!
  // then generate your move
  // gameState.board = [
  //   [0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0],
  //   [0,0,0,1,0,0,0],
  //   [0,1,2,1,2,0,0],
  // ]
  const move = {
    col: Math.floor(Math.random() * 7),
  };
  // for connect4 { col: Math.floor(Math.random() * 6) }
  // and play it.
  await playMove(gameId, GAMETYPE, move);
});
