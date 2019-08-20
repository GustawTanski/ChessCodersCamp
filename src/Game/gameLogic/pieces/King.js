import Piece from "./Piece";
// Odpowiedzialność: Reprezentuje pionek w silniku gry - pozycja, ruch, dozwolone ruchy itd.
class King extends Piece {
    constructor(position, color) {
        super(position, color);
        this.isMoved = false;
        this.rookDirectionInCastling = null;
        this.wasChecked = false;
    }

    move(toCoords) {
        //metoda odpowiedzialna za poruszanie się pionka 
        //i jeżeli król wykonał jakiś ruch zmienia flage na true
        const { x, y } = toCoords;
        this._position = { x, y };
        this.isMoved = true;
    }
    // sprawdza czy roszada jest dozwolona
    isThisCastling(toCoords, boardState) {
        const { x, y } = toCoords
        if (!this.isMoved && this.checkCastling(toCoords, boardState)) {
            console.log("CASTLING", true)
            return true;
        }
        console.log("CASTLING", false)

        return false;
    }

    //sprawdza czy na drodze do wieży nie stoi zaden inny pionek
    checkCastling(toCoords, boardState) {
        const { x, y } = toCoords;
        const boardState2D = boardState.toTwoDimensionArray();
        let i = this._position.x;
        if (this._position.x > x) {
            for (i; i >= 1; i--) {
                if (boardState2D[i][y] !== undefined && boardState2D[i][y].name != this._name) return false
            }
        } else {
            for (i; i <= 6; i++) {
                if (boardState2D[i][y] !== undefined && boardState2D[i][y].name != this._name) return false
            }
        }
        return true;
    }
    //zwraca coordy na które powinna udac sie wieza po roszadzie
    getCoordsOfTheRookAfterCastling() {
        switch (this.rookDirectionInCastling) {
            case "right": return { x: 3, y: this._position.y }
            case "left": return { x: 5, y: this._position.y }
        }
    }
    // zwraca coordy wieży która bierze udział w roszadzie
    getCoordsOfTheRookInCastling(toCoords) {
        const { x, y } = toCoords;
        if (this._position.x == x - 2) {
            this.rookDirectionInCastling = "left";
            console.log(this.rookDirectionInCastling)
            return { x: 7, y }
        }
        else if (this._position.x == x + 2) {
            this.rookDirectionInCastling = "right";
            return { x: 0, y }
        }
        return { x: 0, y }
    }

    legalMoves(boardState, pieces) {
        const possiblePositions = this._allPossiblePositions();
        const onBoardPositions = possiblePositions.filter(pos => {
            return !this._isOutOfTheBoard(pos);
        });
        const boardState2D = boardState.toTwoDimensionArray();
        const yourPossiblePiecePositions = onBoardPositions.filter(pos =>
            boardState2D[pos.x][pos.y] == undefined ||
            boardState2D[pos.x][pos.y].color != this._color
        );
        try {
            const opponentPieceMoves = this.checkOpponentMoves(boardState, pieces);
            const legalPositions = this.checkLegalPosition(yourPossiblePiecePositions, opponentPieceMoves);
            return legalPositions;
        } catch (TypeError) {
            console.log(TypeError)
            return yourPossiblePiecePositions
        }
    }

    checkOpponentMoves(boardState, pieces) {
        let removeYourPieces = pieces.filter(piece => {
            if (piece._color != this._color) {
                return piece;
            }
        })
        let opponentPieceMoves = removeYourPieces.map(piece => {
            if (piece._name == "King") {
                if (!this.wasChecked) {
                    this.wasChecked = true;
                    return piece.legalMoves(boardState, pieces)
                } else {
                    return;
                }
            }
            else return piece.legalMoves(boardState)
        })
        this.wasChecked = false;
        return opponentPieceMoves;
    }

    checkLegalPosition(yourPossiblePiecePositions, opponentPieceMoves) {
        const opponentLegalMoves = opponentPieceMoves.flat();
        const legalMoves = yourPossiblePiecePositions;
        const showTheSamePositions = legalMoves.map(el => {
            for (const opponentMove of opponentLegalMoves) {
                if (el.x === opponentMove.x && el.y === opponentMove.y) {
                    return el;
                }
            }
        })
        const legalPositions = legalMoves.filter((el, index) => {
            if (showTheSamePositions[index] === undefined) {
                return legalMoves[index];
            }
        });
        return legalPositions;
    }

    _allPossiblePositions() {
        const possiblePositions = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i != 0 || j != 0) {
                    possiblePositions.push(
                        {
                            x: this._position.x + i,
                            y: this._position.y + j
                        },
                    );
                }
            }
        }
        if (!this.isMoved) {
            possiblePositions.push({
                x: this._position.x + 2,
                y: this._position.y
            },
                {
                    x: this._position.x - 2,
                    y: this._position.y
                }
            )
        }
        return possiblePositions;
    }
}
export default King;
