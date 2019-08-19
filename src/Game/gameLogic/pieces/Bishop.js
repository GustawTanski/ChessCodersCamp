// Zawiera klasę figury gońca
// Goniec:
/////1. poruszanie się po przekątnych.
/////2. nie może przeskakiwać przez inne figury
/////3. może zbijać figury przeciwnika.

import Piece from "./Piece";
class Bishop extends Piece {
    constructor(position, color) {
        super(position, color);
    }

    // metoda sprawdzająca możliwe ruchy
    legalMoves(boardState) {

        //wszystkie możliwe ruchy Gońca
        const possiblePositions = this._allPossiblePositions();




        //figura nie może znajdować się poza szchownicą
        const onBoardPositions = possiblePositions.filter(pos => {
            return !this._isOutOfTheBoard(pos);
        });


        //eliminacja pozycji gdzie stoją figury tego samego koloru
        //tablica dwuwymiarowa
        try {
            const boardState2D = boardState.toTwoDimensionArray();
            const legalPositions = onBoardPositions.filter(pos =>
                boardState2D[pos.x][pos.y] == undefined ||
                boardState2D[pos.x][pos.y].color != this._color);

            return legalPositions;
        } catch (TypeError) {
            return onBoardPositions;
        }

    }


    _allPossiblePositions() {
        const arrDiagonal = [];
        arrDiagonal.push(...this._addUpRight());
        arrDiagonal.push(...this._addUpLeft());
        arrDiagonal.push(...this._addDownRight());
        arrDiagonal.push(...this._addDownLeft());
        return arrDiagonal;
    }


    _addUpRight() {
        const arr = [];
        if (this._position.y > this._position.x && this._position.y < 7) {
            arr.push({
                x: 7 - (this._position.y - this._position.x),
                y: 7
            })
        } else {
            arr.push({
                x: 7,
                y: 7 - (this._position.x - this._position.y)
            })
        }
        return arr;
    }



    _addUpLeft() {
        const arr = [];
        if (8 - this._position.x < this._position.y && this._position.y < 7) {
            arr.push({
                y: 7,
                x: (this._position.x + this._position.y) - 7
            })
        } else {
            arr.push({
                y: (this._position.x + this._position.y) - 0,
                x: 0
            })
        }
        return arr;
    }



    _addDownRight() {
        const arr = [];
        if (this._position.x > this._position.y && this._position.y > 0) {
            arr.push({
                y: 0,
                x: 0 + (this._position.x - this._position.y)
            })
        } else {
            arr.push({
                y: 0 + (this._position.y - this._position.x),
                x: 0
            })
        }
        return arr;
    }

    _addDownLeft() {
        const arr = [];
        if (8 - this._position.x > this._position.y && this._position.y > 0) {
            arr.push({
                y: 0,
                x: (this._position.x + this._position.y) - 0
            })
        } else {
            arr.push({
                y: (this._position.x + this._position.y) - 7,
                x: 7
            })
        }
        return arr;
    }
}

export default Bishop;