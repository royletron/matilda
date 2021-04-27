const delay = require("../utils/delay");
const getGame = require("../utils/getGame");
const getState = require("../utils/getState");
const logger = require("../utils/logger");

//A big loop....
const run = async (gameType, playFunction) => {
  let errored = false;
  while (!errored) {
    try {
      //The first loop loops through games, if a game errors it stops.
      const { gameId } = await getGame(gameType);
      logger.info("initialized", gameId);

      let complete = false;
      let status = "";
      while (!complete) {
        //We have a game, so loop and get the state
        const currentGameState = await getState(gameId, gameType);
        if (currentGameState.state !== status) {
          status = currentGameState.state;
          logger.info(`changed to [${currentGameState.state}]`, gameId);
        }
        //currentGameState.board = 3x3 array representing state of board.
        switch (currentGameState.state) {
          //If the game hasn't started we wait
          case "waiting":
            await delay(1500);
            break;
          //If the game is playing we try to make moves
          case "playing":
            if (currentGameState.canPlay) {
              await playFunction(gameId, currentGameState);
            } else {
              //opponent is playing, lets wait
              await delay(500);
            }
            break;
          //If the game isn't waiting or playing it must be over..
          default:
            logger.info(`is now [${currentGameState.state}]`, gameId);
            complete = true;
            break;
        }
      }
    } catch (error) {
      console.error(error);
      errored = true;
      process.exit(1);
    }
  }
  process.exit(1);
};

module.exports = run;
