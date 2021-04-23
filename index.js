const TOKEN = process.env.TOKEN;
const fetch = require("node-fetch");
const HOST = "https://manor-two.vercel.app";

const delay = (ms) => {
  console.log("Delaying for a bit", ms);
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

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

const playRandomMove = (gameId) => {
  console.log("Playing random move", gameId);
  return fetch(`${HOST}/api/tictactoe/${gameId}/play`, {
    method: "POST",
    body: JSON.stringify({
      token: TOKEN,
      x: Math.floor(Math.random() * 2),
      y: Math.floor(Math.random() * 2),
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

const getState = (gameId) => {
  return fetch(`${HOST}/api/tictactoe/${gameId}`, {
    method: "POST",
    body: JSON.stringify({
      token: TOKEN,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json()); // expecting a json response
};

getGame()
  .then(async ({ gameId }) => {
    let complete = false;
    while (!complete) {
      const game = await getState(gameId);
      switch (game.state) {
        case "waiting":
          await delay(500);
          break;
        case "playing":
          const response = await playRandomMove(gameId);
          console.log(response.message);
          break;
        default:
          complete = true;
          break;
      }
    }
  })
  .then(() => console.log("done"))
  .catch((error) => {
    console.error(error);
  });
