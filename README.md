# Matilda

The _most simple_ of TicTacToe agents.

AAAA

## A Guide

### 1. Get a token

So the _Manor_ requires you to first get a `token` for your player. Tokens are forever and un-retrievable so don't lose it. If you do you just have to come up with another for a new name and forget your old one ever existed.

```bash
curl --location --request POST 'https://manor.anton.royletron.dev/api/player' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "matilda"
}'
```

This should give you a JSON response with a `token: <your token>` field. You will need this token for the `TOKEN=<your token>` environment variable.

### 2. Read the code

Matilda is daft, all she does is play a completely random move - she doesn't even check the game state to see if the place she wants to play is free. If she did want to, she could read the `board` to get a 3x3 array - for tictactoe, or a 6x5 for connect4 - that represents the current board where `0=free`, `1=you` and `2=opponent`. From this you can decide you next move.

The basic flow of the code is as follows.

1. Grab a gameId - this will either be just you, or assign you to an existing opponent

2. Wait for the game state to be `playing` - until this is true you are likely just waiting for another player to join. (Note that games expire after 10 seconds on inactivity - so just request another gameId in step one)

3. If the game is `playing` see if its our turn, and then play our move - in Matilda's case we just pick a random spot you should probably be more clever.

4. Loop for all time - playing games forever sounds fun right!

A `main.js` is provided as an example:

```js
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
```

But basically you can see the `gameState` and then generate your `move`

### 3. Boot it up

Remember you need your token.

```bash
TOKEN=<your token> npm run play
```

And watch as battle commences.
