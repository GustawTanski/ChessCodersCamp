import Piece from "../pieces/Piece";

class BoardState {
    constructor(board) {
        this._boardState = BoardState.flatten(board);
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
    static flatten(board) {
        let boardState = new Array();

        for (let piece of board) {
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
    static deflatten(boardState) {
        let board = new Array();

        for (let piece of boardState) {
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

    toTwoDimensionArray() {
        let array2d = new Array(8);

        // Inicjalizacja dwuwymiarowej tablicy
        for (let i = 0; i < array2d.length; ++i) {
            array2d[i] = new Array(8);
        }

        for (let piece of this._boardState) {
            array2d[piece.currentPosition[0]][piece.currentPosition[1]] = piece;
        }

        return array2d;
    }
}

export default BoardState;