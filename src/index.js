

import Game from "./Game"

const game = new Game();
game.start();

import Queen from "./Game/gameLogic/pieces/Queen"
import Board from "./Game/gameLogic/Board"
import BoardState from "./Game/gameLogic/history/BoardState"


// <<<<<<< HEAD
//w tym pliku inicjalizowana będzie aplikacja i prawdopobodnie nic więcej
// console.log(new Board().pieces)
const b = new Board()
// console.log(b.boardHistory.last().toTwoDimensionArray());
let o = {"x":2,"y":3}
let x = [2,23,o,5,6,7,]


// console.log(b.isCheck())
b.boardHistory.push(new BoardState(b.pieces))
// console.log(b.legalMoves({"x":3,"y":0}))
b.movePiece({"x":3,"y":0},{"x":5,"y":5})
const g = new BoardState(b.pieces);