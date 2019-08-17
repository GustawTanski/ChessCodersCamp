import Piece from "./Piece";
// Odpowiedzialność: Reprezentuje pionek w silniku gry - pozycja, ruch, dozwolone ruchy itd.
class King extends Piece {
    constructor(position, color) {
        super(position, color);
        this.isMoved = false;
    }

    move(toCoords) {
        //metoda odpowiedzialna za poruszanie się pionka 
        //i jeżeli król wykonał jakiś ruch zmienia flage na false
        const { x, y } = toCoords;
        this._position = { x, y }
        this.isMoved = false;
    }

    legalMoves(boardState) {
        const possiblePositions = this._allPossiblePositions();
        const boardState2D = boardState.toTwoDimensionArray();
        const onBoardPositions = possiblePositions.filter(pos => {
            return !this._isOutOfTheBoard(pos);
        });
        const yourPossiblePiecePositions = onBoardPositions.filter(pos => {
            const pieceOnBoard = boardState2D[pos.x][pos.y];
            return pieceOnBoard.color != this._color;
        });
        // wyszukuje wszystkie mozliwe ruchy pionków przeciwnika
        const opponentPieceMoves = this.checkOpponentMoves(boardState, boardState2D);
        // zwraca tablice mozliwych ruchow uwzgledniajac mozliwe ruchy przeciwnika
        const legalPositions = this.checkLegalPosition(yourPossiblePiecePositions, opponentPieceMoves);
        //zwraca legalne pozycje - tablicę elementów Coords
        return legalPositions;
    }

    checkOpponentMoves(boardState, boardState2D) {
        const arrayOfOpponentPositions = [];
        boardState2D.map((posX, posXValue, boardState2D) => {
            for (const posY in posX) {
                if (boardState2D[posXValue][posY] !== undefined) {
                    arrayOfOpponentPositions.push(boardState2D[posXValue][posY].legalMoves(boardState))
                }
            }
        })
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
                return legalMoves[index]
            }
        })
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
