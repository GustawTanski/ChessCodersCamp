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

        //tablica dwuwymiarowa
        const boardState2D = boardState.toTwoDimensionArray();

        //eliminacja pozycji gdzie stoją figury tego samego koloru
        const legalPositions = onBoardPositions.filter(pos => {
            if (boardState2D[pos.x][pos.y].color != this._color) {
                return true;
            }
        });

        return legalPositions;
    }


    _allPossiblePositions() {
        const possiblePositions = [];

        possiblePositions.push({

        });
        // Up right
        // if (this._position.y > this._position.x) {
        //     y = 7;
        //     x = 7 - (y - x)
        // } else {
        //     y = 7 - (x - y);
        //     x = 7;
        // }

        // // Down left
        // if (x > y) {
        //     y = 0;
        //     x = 0 + (x - y)
        // } else {
        //     y = 0 + (y - x);
        //     x = 0;
        // }

        // // Up left
        // if (8 - x < y) {
        //     y = 7;
        //     x = (x + y) - 7;
        // } else {
        //     y = (x + y) - 0;
        //     x = 0;
        // }

        // // Down right
        // if (8 - x > y) {
        //     y = 0;
        //     x = (x + y) - 0;
        // } else {
        //     y = (x + y) - 7;
        //     x = 7;
        // }
    }
}

export default Bishop;