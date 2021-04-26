//The following is just for running on K8s and allows health/ready probes
const App = require("@tinyhttp/app").App;
const connect4 = require("./engines/connect4");
const tictactoe = require("./engines/tictactoe");

const GAME = process.env.GAME || "tictactoe";

const app = new App();

app
  .get("/healthz", (_, res) => {
    res.send("ok");
  })
  .get("/readyz", (req, res) => {
    res.send("ok");
  })
  .listen(process.env.PORT || 3000);

switch (GAME) {
  case "connect4":
    return connect4();
  default:
    return tictactoe();
}
