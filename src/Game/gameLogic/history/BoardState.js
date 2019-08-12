import Piece from "../pieces/Piece";

class BoardState {
    constructor(board) {
        this._boardState = flattenBoard(board);
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
            colorChess: "black",
            movePoint: ,
            moveDirection: "diagonally"
        }
    */
    static flattenBoard(board) {
        var boardState = [[]];

        for (var x = 0; x < board.length; ++x) {
            for (var y = 0; y < board.length; ++y) {
                let currentField = board[x][y];

                if (currentField !== undefined) {
                    boardState[x][y] = {
                        name: currentField.name,
                        colorChess: currentField.colorChess,
                        movePoint: currentField.movePoint,
                        moveDirection: currentField.moveDirection
                    }
                }
            }
        }

        return boardState;
    }

    /*
        Mapuje dwumiarową, spłaszczoną tablicę obiektów 
        na właściwy obiekt typu Piece.
    */
    static deflattenBoard(boardState) {
        for (var x = 0; x < boardState.length; ++x) {
            for (var y = 0; y < boardState.length; ++y) {
                let currentField = boardState[x][y];

                if (currentField !== undefined) {
                    board[x][y] = new Piece(
                        currentField.name, 
                        [x, y], 
                        currentField.colorChess,
                        currentField.movePoint,
                        currentField.moveDirection
                    )
                }
            }
        }
    }
}

export default BoardState;