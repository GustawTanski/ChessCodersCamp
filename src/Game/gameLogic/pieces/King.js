import Piece from "./Piece";
// Odpowiedzialność: Reprezentuje pionek w silniku gry - pozycja, ruch, dozwolone ruchy itd.
class King extends Piece {
    constructor(position, color) {
        super(position, color);
        this.isMoved = false;
        this.rookDirectionInCastling = null;
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
        if (!this.isMoved && this.checkCastling(toCoords, boardState) && this._position == x - 2 || this._position == x + 2) {
            return true;
        }
        return false;
    }

    //sprawdza czy na drodze do wieży nie stoi zaden inny pionek
    checkCastling(toCoords, boardState) {
        const { x, y } = toCoords;
        const boardState2D = boardState.toTwoDimensionArray();
        let i = this._position.x;
        if (this._position.x > x) {
            for (i; i >= 1; i--) {
                if (boardState2D[i][y] !== undefined) return false
            }
        } else {
            for (i; i <= 6; i++) {
                if (boardState2D[i][y] !== undefined) return false
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
        if (this._position == x - 2) {
            this.rookDirectionInCastling = "left";
            return { x: 7, y }
        }
        else if (this._position == x + 2) {
            this.rookDirectionInCastling = "right";
            return { x: 0, y }
        }
    }

    legalMoves(boardState) {
        // const possiblePositions = this._allPossiblePositions();
        // const boardState2D = boardState.toTwoDimensionArray();
        // const onBoardPositions = possiblePositions.filter(pos => {
        //     return !this._isOutOfTheBoard(pos);
        // });
        // const yourPossiblePiecePositions = onBoardPositions.filter(pos => {
        //     const pieceOnBoard = boardState2D[pos.x][pos.y];
        //     return pieceOnBoard.color != this._color;
        // });
        // // wyszukuje wszystkie mozliwe ruchy pionków przeciwnika
        // const opponentPieceMoves = this.checkOpponentMoves(boardState, boardState2D);
        // // zwraca tablice mozliwych ruchow uwzgledniajac mozliwe ruchy przeciwnika
        // const legalPositions = this.checkLegalPosition(yourPossiblePiecePositions, opponentPieceMoves);
        // //zwraca legalne pozycje - tablicę elementów Coords
        // return legalPositions;
        return [];
    }

    checkOpponentMoves(boardState, boardState2D) {
        const arrayOfOpponentPositions = [];
        boardState2D.map((posX, posXValue, boardState2D) => {
            for (const posY in posX) {
                if (boardState2D[posXValue][posY] !== undefined) {
                    arrayOfOpponentPositions.push(boardState2D[posXValue][posY].legalMoves(boardState));
                }
            }
        });
        return arrayOfOpponentPositions;
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
        return possiblePositions;
    }
}
export default King;
