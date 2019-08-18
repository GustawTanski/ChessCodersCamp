import position from "./position";

// TODO:: bicie w przelocie (jak wymyślę jak to zrobić), promocja, inne ruchy zależne od ustawienia pionka

class Pawn extends position {
    constructor(position, color) {
        super(position, color);
        this._wasMoved = false;
    }

    move(toCoords) {
        const {x, y} = toCoords;
        this._position = {x, y};
        this._wasMoved = true;
    }

    legalMoves(boardState) {
        const possiblePositions = this._allPossiblePositions(boardState);

        const onBoardPositions = possiblePositions.filter(pos => !this._isOutOfTheBoard(pos));

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

    /*
        Zwraca wszystkie możliwe ruchy pionka
    */
    _allPossiblePositions(boardState) {
        const possiblePositions = [];

        this._forwardMoves(possiblePositions);
        this._possibleCaptureMoves(possiblePositions, boardState);

        return possiblePositions;
    }

    /*
        Dodaje ruch o jedno pole w przód, lub o dwa jeśli
        pionek nie wykonywał wcześniej żadnych ruchów
    */
    _forwardMoves(possiblePositions) {
        possiblePositions.push({
            x: this._position.x,
            y: this._position.y + 1
        });

        if (!this._wasMoved) {
            possiblePositions.push({
                x: this._position.x,
                y: this._position.y + 2
            })
        }
    }

    /*
        Dodaje ruchy po skosie związane z potencjalnym biciem
    */
    _possibleCaptureMoves(possiblePositions, boardState) {
        const boardState2D = boardState.toTwoDimensionArray();
        let pieces = [boardState2D[this._position.x - 1][this._position.y + 1],
                      boardState2D[this._position.x + 1][this._position.y + 1]];

        for (let piece of pieces) {
            if (piece != undefined && piece._color != this._color) {
                possiblePositions.push(piece._position);
            }
        }
    }
}

export default Knight;