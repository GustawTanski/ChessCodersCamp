// import Knight from "../pieces/Knight";
import Bishop from "../pieces/Bishop";
// import Pawn from "../pieces/Pawn";
// import King from "../pieces/King";
// import Queen from "../pieces/Queen";
// import Rook from "../pieces/Rook";

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
            color: "black"
        }
    */
    static flatten(board) {
        let boardState = new Array();

        for (let piece of board) {
            boardState.push({
                name: piece.name,
                position: piece.position,
                color: piece.color
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

    /* 
        Inicjalizuje tablicę o określonym rozmiarze
        i wypełnia ją undefined
    */
    _emptyArrayHelper(size) {
        const emptyArray = [];

        for (let i = 0; i < size; i++) {
            emptyArray.push(undefined);
        }

        return emptyArray;
    }

    /*
        Wywołuje konstruktor poprawnego typu pionka
        na podstawie jego nazwy.
    */
    _createProperPiece(flatPiece) {
        const pieceTypes = [Knight, Bishop, Pawn, King, Queen, Rook];
        const CurrentPiece = pieceTypes.find(type => type.name == flatPiece.name);

        if (!CurrentPiece) throw Error("Improper piece name");

        return new CurrentPiece(flatPiece.position, flatPiece.color);
    }
}

export default BoardState;