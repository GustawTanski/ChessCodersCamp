import Piece from "../pieces/Piece";

class BoardState {
    constructor(board) {
        this._boardState = BoardState.flatten(board);
        // Hej, ja dałbym tutaj freeze na this._boardState
        // bo freeze nie jest głęboki, a to właśnie this._boardState chcemy
        // zamrozić
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
        // let array2d = new Array(8);
        // pozwoliłem sobie zmienić na taką prostą metodę - tablice stworzone przez new Array()
        // z jednym argumentem liczbowym czasem zachowują się dziwnie - lepiej wypełnić undefined
        const array2d = this._emptyArrayHelper(8)

        // Inicjalizacja dwuwymiarowej tablicy
        for (let i = 0; i < array2d.length; ++i) {
            // array2d[i] = new Array(8);
            array2d[i] = this._emptyArrayHelper(8);
        }

        for (let piece of this._boardState) {
            array2d[piece.currentPosition[0]][piece.currentPosition[1]] = piece;
        }

        return array2d;
    }

    _emptyArrayHelper(size) {
        const emptyArray = [];
        for(let i = 0 ; i < size ; i++){
            emptyArray.push(undefined);
        }
        return emptyArray;
    }
}



export default BoardState;