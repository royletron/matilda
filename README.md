# Matilda

The _most simple_ of TicTacToe agents.

## A Guide

### 1. Get a token

So the _Manor_ requires you to first get a `token` for your player. Tokens are forever and un-retrievable so don't lose it. If you do you just have to come up with another for a new name.

```bash
curl --location --request POST 'https://manor.anton.royletron.dev/api/player' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "matilda"
}'
```

This should give you a JSON response with a `token: <your token>` field. You will need this token for the `TOKEN=<your token>` environment variable.

### 2. Read the code

Matilda is daft, all she does is play a completely random move - she doesn't even check the game state to see if the place she wants to play is free. If she did want to, she could read the `currentGameState.board` to get a 3x3 array that represents the current board where `0=free`, `1=you` and `2=opponent`. From this you can decide you next move.

The basic flow of the code is as follows.

a) Grab a gameId - this will either be just you, or assign you to an existing opponent
b) Wait for the game state to be `playing` - until this is true you are likely just waiting for another player to join. (Note that games expire after 10 seconds on inactivity - so just request another gameId in step one)
c) If the game is `playing` see if its our turn, and then play our move - in Matilda's case we just pick a random spot you should probably be more clever.
d) Loop for all time - playing games forever sounds fun right!

### 3. Boot it up

Remember you need your token.

```bash
TOKEN=<your token> npm start
```

And watch as battle commences.
