// import App from "./App";
// import BoardState from "./Game/gameLogic/history/BoardState"

import Bishop from "./Game/gameLogic/pieces/Bishop"
import BoardState from "./Game/gameLogic/history/BoardState"

const bishop = new Bishop({
    x: 2,
    y: 0
}, "white")
console.log(bishop.legalMoves(new BoardState([])))
//w tym pliku inicjalizowana będzie aplikacja i prawdopobodnie nic więcej

// const app = new App();

import Game from "./Game"

const game = new Game();
game.start();