//klasa reprezentaująca figurę skoczka
//skoczek porusza się po literze 'L' - krok o jedno pole w pionie lub poziomie, a następnie drugi krok na ukos
//skoczek ignoruje figury stojące na jego drodze, przeskakuje przez nie

import Piece from "./Piece";
class Knight extends Piece {

    constructor(position, color) {
        super(position, color);
    }

    //metoda zwracająca tablicę z dostępnymi opcjami ruchu
    //skoczek może ruszyć się maksymalnie na 8 dostepnych pozycji
    //należy wyeliminować pozycje poza szachownicą
    //oraz pozycje na których stoją figury tego samego koloru co dany skoczek
    legalMoves(boardState) {

        // boardState = boardState.last();
        const possiblePositions = this._allPossiblePositions();
        const onBoardPositions = this._removeOutOfBoardPositions(possiblePositions);
        const legalPositions = this._removePositionsTakenByYourOwnPieces(onBoardPositions, boardState);
        return legalPositions;
    }


    //zwraca wszystkie 8 możliwych pozycji po ruchu skoczka
    _allPossiblePositions() {
        const possiblePositions = [];
        for (let i = -2; i <= 2; i += 4) {
            for (let j = -1; j <= 1; j += 2) {

                possiblePositions.push({
                    x: this._position.x + i,
                    y: this._position.y + j
                });

                possiblePositions.push({
                    x: this._position.x + j,
                    y: this._position.y + i
                });
            }
        }
        return possiblePositions;
    }


    //eliminacja pozycji poza szachownicą
    _removeOutOfBoardPositions(positions) {
        return positions.filter(pos => {
            return !this._isOutOfTheBoard(pos);
        });
    }


    //eliminacja pozycji na których już stoi figura tego samego koloru co skoczek - nie zbijamy samych siebie
    //w przypadku kiedy boardState jest pusty obsłuży bład TypeError
    //spowodowany wywołaniem metody .toTwoDimensionArray() na pustym obiekcie
    _removePositionsTakenByYourOwnPieces(positions, boardState) {
        try {
            const boardState2D = boardState.toTwoDimensionArray();
            const legalPositions = positions.filter(pos => {
                if (boardState2D[pos.x][pos.y] == undefined || boardState2D[pos.x][pos.y].color != this._color) {
                    return true;
                }
            });

            return legalPositions;

        } catch (TypeError) {
            return positions;
        }
    }

}

export default Knight;