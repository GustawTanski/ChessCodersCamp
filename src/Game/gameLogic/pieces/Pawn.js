import Piece from "./Piece";

class Pawn extends Piece {
    constructor(position, color, pawnNumber) {
        super(position, color);
        this._wasMoved = false;
        this._pawnNumber = pawnNumber;
    }

    get pawnNumber() {
        return this._pawnNumber;
    }

    move(toCoords) {
        const {
            x,
            y
        } = toCoords;
        this._position = {
            x,
            y
        };
        this._wasMoved = true;
    }

    legalMoves(boardState, previousBoardState) {
        const possiblePositions = this._possiblePositions(boardState, previousBoardState);
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


    isThisEnPassant(toCoords, boardState, previousBoardState) {
        const enemyPawn = this._findEnemyPawn(boardState, toCoords);
        if (!enemyPawn) return false;

        if (enemyPawn.name === "Pawn" && (this.position.y === 3 || this.position.y === 4)) {
            const previousPositionOfEnemyPawn = this._findPreviousPositionOfEnemyPawn(previousBoardState, enemyPawn);
            if (enemyPawn.color !== this.color && (previousPositionOfEnemyPawn.y === 1 || previousPositionOfEnemyPawn.y === 6)) {
                return true;
            }
        }

        return false;
    }

    _findEnemyPawn(boardState, coords) {
        return boardState.boardState
            .find(piece => 
                piece.position.x === coords.x && 
                piece.position.y === this._position.y
            );
    }

    _findPreviousPositionOfEnemyPawn(previousBoardState, enemyPawn) {
        if (!previousBoardState) return undefined;
        
        return previousBoardState.boardState
            .find(piece => 
                piece.pawnNumber === enemyPawn.pawnNumber && 
                piece.color === enemyPawn.color
            ).position;
    }

    getCoordsOfCapturedPawn(toCoords, boardState, previousBoardState) {
        if (this.isThisEnPassant(toCoords, boardState, previousBoardState)) {
            return {
                x: toCoords.x,
                y: this._position.y
            };
        }
        return null;
    }


    /*
        Zwraca wszystkie możliwe ruchy pionka
    */
    _possiblePositions(boardState, previousBoardState) {
        const possiblePositions = [];

        this._forwardMoves(possiblePositions, boardState);
        this._possibleCaptureMoves(possiblePositions, boardState);
        this._possibleEnPassant(possiblePositions, boardState, previousBoardState);

        return possiblePositions;
    }

    /*
        Dodaje ruch o jedno pole w przód, lub o dwa jeśli
        pionek nie wykonywał wcześniej żadnych ruchów
    */
    _forwardMoves(possiblePositions, boardState) {
        const sign = this._colorSign();

        if (!this._isBlockedFromForward(boardState)) {
            possiblePositions.push({
                x: this._position.x,
                y: this._position.y + (1 * sign)
            });

            if (!this._wasMoved) {
                const array2d = boardState.toTwoDimensionArray();

                if (array2d[this._position.x][this._position.y + 2] === undefined) {
                    possiblePositions.push({
                        x: this._position.x,
                        y: this._position.y + (2 * sign)
                    });
                }
            }
        }
    }

    /*
        Dodaje ruchy po skosie związane z potencjalnym biciem
    */
    _possibleCaptureMoves(possiblePositions, boardState) {
        const boardState2D = boardState.toTwoDimensionArray();
        const sign = this._colorSign();
        const pieces = [];

        if (this._position.x > 0) {
            pieces.push(boardState2D[this._position.x - 1][this._position.y + (1 * sign)]);
        }

        if (this._position.x < 7) {
            pieces.push(boardState2D[this._position.x + 1][this._position.y + (1 * sign)]);
        }

        for (let piece of pieces) {
            if (piece != undefined && piece.color != this._color) {
                possiblePositions.push(piece.position);
            }
        }
    }

    _possibleEnPassant(possiblePositions, boardState, previousBoardState) {
        const enPassantMoves = [];
        const sign = this._colorSign();

        if (this._position.y === 3 || this._position.y === 4) {
            if (this._position.x > 0) {
                enPassantMoves.push({
                    x: this._position.x - 1,
                    y: this._position.y + (1 * sign)
                });
            }
    
            if (this._position.x < 7) {
                enPassantMoves.push({
                    x: this._position.x + 1,
                    y: this._position.y + (1 * sign)
                });
            }
        }

        console.log(enPassantMoves);

        possiblePositions.push.apply(possiblePositions, enPassantMoves
            .filter(elem => elem !== undefined)
            .filter(coords => this.isThisEnPassant(coords, boardState, previousBoardState))
        );
    }

    /*
        Zwraca poprawną liczbę do poruszania pionka po osi y, 
        dodatnią dla pionków białych, ujemną dla czarnych
    */
    _colorSign() {
        return this._color == "white" ? 1 : -1;
    }

    /*
        Sprawdza, czy pionek jest blokowany z przodu
        co uniemożliwia mu ruch
    */
    _isBlockedFromForward(boardState) {
        let piece = boardState.toTwoDimensionArray()[this._position.x][this._position.y + (1 * this._colorSign())];

        return piece != undefined;
    }
}

export default Pawn;