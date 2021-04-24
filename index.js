const TOKEN = process.env.TOKEN;
const HOST = process.env.HOST || "https://manor.anton.royletron.dev";
const fetch = require("node-fetch");

//The following is just for running on K8s and allows health/ready probes
const App = require("@tinyhttp/app").App;

const app = new App();

app
  .get("/healthz", (_, res) => {
    res.send("ok");
  })
  .get("/readyz", (req, res) => {
    res.send("ok");
  })
  .listen(3000);

//Useful promise for waiting for a bit....
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

//Gets a new game from the lobby
const getGame = () => {
  console.log("Getting a game");
  return fetch(`${HOST}/api/tictactoe/lobby`, {
    method: "POST",
    body: JSON.stringify({
      token: TOKEN,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

//Plays a completely random (possibly illegal) move
const playRandomMove = (gameId) => {
  console.log("Playing random move", gameId);
  return fetch(`${HOST}/api/tictactoe/${gameId}/play`, {
    method: "POST",
    body: JSON.stringify({
      token: TOKEN,
      x: Math.floor(Math.random() * 2.8),
      y: Math.floor(Math.random() * 2.8),
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

//Gets the state of the current game.
const getState = (gameId) => {
  return fetch(`${HOST}/api/tictactoe/${gameId}`, {
    method: "POST",
    body: JSON.stringify({
      token: TOKEN,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

//A big loop....
const run = async () => {
  let errored = false;
  while (!errored) {
    try {
      //The first loop loops through games, if a game errors it stops.
      const { gameId } = await getGame();
      let complete = false;
      while (!complete) {
        //We have a game, so loop and get the state
        const currentGameState = await getState(gameId);
        //currentGameState.board = 3x3 array representing state of board.
        switch (currentGameState.state) {
          //If the game hasn't started we wait
          case "waiting":
            await delay(1500);
            break;
          //If the game is playing we try to make moves
          case "playing":
            if (currentGameState.canPlay) {
              await playRandomMove(gameId);
            } else {
              //opponent is playing, lets wait
              await delay(500);
            }
            break;
          //If the game isn't waiting or playing it must be over..
          default:
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
};

run();
