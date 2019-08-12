import Piece from "../pieces/Piece";

class BoardState {
    constructor(board) {
        this._boardState = BoardState.flattenBoard(board);
        Object.freeze(this);
    }

    get boardState() {
        return this._boardState;
    }

    /* 
        Mapuje dwuwymiarową tablicę obiektów typu Piece
        do dwuwymiarowej tablicy obiektów przechowujących
        ich parametry w spłaszczonej strukturze:
        {
            name: "bishop",
            currentPosition: [1, 5],
            colorChess: "black",
            movePoint: 2,
            moveDirection: "diagonally"
        }
    */
    static flattenBoard(board) {
        var boardState = new Array();

        for (var piece of board) {
            boardState.push({
                name: piece.name,
                currentPosition: piece.currentPosition,
                colorChess: piece.colorChess,
                movePoint: piece.movePoint,
                moveDirection: piece.moveDirection
            });
        }

        return boardState;
    }

    /*
        Mapuje dwumiarową, spłaszczoną tablicę obiektów 
        na właściwy obiekt typu Piece.
    */
    static deflattenBoard(boardState) {
        var board = new Array();

        for (var piece of boardState) {
            board.push(new Piece(
                piece.name, 
                piece.currentPosition, 
                piece.colorChess,
                piece.movePoint,
                piece.moveDirection
            ));
        }

        return board;
    }
}

export default BoardState;