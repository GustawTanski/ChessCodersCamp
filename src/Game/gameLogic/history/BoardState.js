import {Knight, Bishop, Pawn, King, Queen, Rook} from "../pieces/"

class BoardState {
    constructor(board) {
        this._boardState = BoardState.flatten(board);
        Object.freeze(this._boardState);

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
            position: [1, 5],
            color: "black",
            movementPoints: 2,
            moveDirection: "diagonally"
        }
    */
    static flatten(board) {
        let boardState = new Array();

        for (let piece of board) {
            boardState.push({
                name: piece.name,
                position: piece.position,
                color: piece.color,
                movementPoints: piece.movementPoints,
                moveDirection: piece.moveDirection
            });
        }

        return boardState;
    }

    /*
        Mapuje dwumiarową, spłaszczoną tablicę obiektów 
        na właściwy obiekt typu dziedziczącego po Piece.
    */
    static deflatten(boardState) {
        let board = new Array();

        for (let flatPiece of boardState) {
            board.push(this._createProperPiece(flatPiece)); 
        }

        return board;
    }

    /*
        Mapuje właściwość _boardState do dwuwymiarowej tablicy
        reprezentującej ułożenie pionków na planszy.
    */
    toTwoDimensionArray() {
        const array2d = this._emptyArrayHelper(8)

        // Inicjalizacja dwuwymiarowej tablicy
        for (let i = 0; i < array2d.length; ++i) {
            array2d[i] = this._emptyArrayHelper(8);
        }

        for (let flatPiece of this._boardState) {
            array2d[flatPiece.position[0]][flatPiece.position[1]] = this._createProperPiece(flatPiece);
        }

        return array2d;
    }

    _emptyArrayHelper(size) {
        const emptyArray = [];

        for (let i = 0; i < size ; i++){
            emptyArray.push(undefined);
        }

        return emptyArray;
    }

    /*
        Wywołuje konstruktor poprawnego typu pionka
        na podstawie jego nazwy.
    */
    _createProperPiece(flatPiece) {
        // let name = flatPiece.name;
        // let position = flatPiece.position;
        // let color = flatPiece.color;
        // let movementPoints = flatPiece.movementPoints;
        // let moveDirection = flatPiece.moveDirection;
        
        // switch(name) {
        //     case "Pawn":
        //         return new Pawn(position, color, movementPoints, moveDirection);
        //     case "Knight":
        //         return new Knight(position, color, movementPoints, moveDirection);
        //     case "Bishop":
        //         return new Bishop(position, color, movementPoints, moveDirection);
        //     case "Rook":
        //         return new Rook(position, color, movementPoints, moveDirection);
        //     case "Queen":
        //         return new Queen(position, color, movementPoints, moveDirection);
        //     case "King":
        //         return new King(position, color, movementPoints, moveDirection);
        //     default:
        //         throw "Improper piece name";
        // }

        return window[name](
            flatPiece.position, 
            flatPiece.color, 
            flatPiece.movementPoints, 
            flatPiece.moveDirection
        );
    }
}

export default BoardState;