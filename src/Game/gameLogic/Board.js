import BoardState from './history/BoardState';
import BoardHistory from './history/BoardHistory';
import Piece from './pieces/Piece';
import Pawn from './pieces/Pawn';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Queen from './pieces/Queen';
import King from './pieces/King';

class Board {
    constructor() {
        this.pieces = new Array();
        this.createPieces();

        this.boardHistory = new BoardHistory();
        this.updateBoardHistory();
        this.check = false;
        this.mate = false;

    }


    getCapturedPieces(color) {
        return this.pieces.filter(piece => piece.color === color && piece.isBeaten === true);
    }


    legalMoves(coords) {

        const chosenPiece = this.findPiece(coords);
        if (chosenPiece instanceof Pawn) {
            const previousBoardState = this.boardHistory[this.boardHistory.length - 2];
            return chosenPiece.legalMoves(this.boardHistory.last(), previousBoardState);
        }
        return chosenPiece.legalMoves(this.boardHistory.last());
    }

    findPiece(coords) {
        return this.pieces.find(piece => piece.position.x === coords.x && piece.position.y === coords.y);
    }




    /* 
    ZAŁOŻENIA:
    1. Roszadę zaczyna król.
       "W oficjalnych rozgrywkach szachowych wymaga się, by w pierwszej kolejności przemieścić króla, a następnie wieżę." (źródło: Wikipedia: Roszada)
    2. Król potrafi stwierdzić, czy dany ruch jest roszadą
       oraz zwrócić współrzędne uczestniczącej w roszadzie wieży
       i współrzędne, na która dana wieża powinna się przesunąć.
    3. Pionek potrafi stwierdzić, czy dany ruch jest biciem w przelocie
       oraz zwrócić współrzędne pionka, który został zbity w przelocie.
    */
    movePiece(fromCoords, toCoords) {
        if (this.isEmpty(toCoords)) {
            const chosenPiece = this.findPiece(fromCoords);
            if (chosenPiece instanceof Pawn) {
                if (chosenPiece.isThisEnPassant(toCoords, this.boardHistory.last())) {
                    const coordsOfCapturedPawn = chosenPiece.getCoordsOfCapturedPawn(toCoords, this.boardHistory.last());
                    this.capturePiece(coordsOfCapturedPawn);
                }
            }
            if (chosenPiece instanceof King) {
                if (chosenPiece.isThisCastling(toCoords, this.boardHistory.last())) {
                    const coordsOfTheRookInCastling = chosenPiece.getCoordsOfTheRookInCastling(toCoords);
                    const coordsOfTheRookAfterCastling = chosenPiece.getCoordsOfTheRookAfterCastling();
                    this.findPiece(coordsOfTheRookInCastling).move(coordsOfTheRookAfterCastling);
                }
            }
        } else {
            this.capturePiece(toCoords);
        }
        this.findPiece(fromCoords).move(toCoords);
        this.updateBoardHistory();
        this.isCheck("white");//kolor króla który ma być sprawdzony
        this.isCheck("black");
        this.isMate("white");
        this.isMate("black");

        return this.boardHistory.last();
    }

    isEmpty(coords) {
        if (this.findPiece(coords)) {
            return false;
        }
        return true;
    }

    capturePiece(coords) {
        this.findPiece(coords).pieceLoss();
    }

    /* DO UZUPELNIENIA */
    isCheck(color) {
        const kingPosition = this._findPiecePosition("King", color)
        return this._canPieceBeCaptured(color, kingPosition)
    }

    _canPieceBeCaptured(color,piecePosition){
        const enemiesPossibleMoves = this._getAllEnemiesLegalMoves(color)
        return enemiesPossibleMoves.some(move => move.x === piecePosition.x && move.y === piecePosition.y)
    }

    isMate(color) {
        const kingPosition = this._findPiecePosition("King", color)
        const kingLegalMoves = this.legalMoves(this._findPiecePosition("King", color))
        const enemiesPossibleMoves = this._getAllEnemiesLegalMoves(color)
        const canKingEscape = kingLegalMoves
            .some(move => {
                for (let enemMove of enemiesPossibleMoves) {
                    if (move.x === enemMove.x && move.y === enemMove.y)
                        return false
                }
                return true;
            })
        const possibleAssassinsPositions = this._getPossibleAssasinsPositions(color, kingPosition)
        let canWeCounterstrike = true;
        if(possibleAssassinsPositions.length > 0){
        const assassinColor = color === 'black' ? 'white' :  'black'
        const canAssasinBeCaptured = this._canPieceBeCaptured(assassinColor, possibleAssassinsPositions[0])
        canWeCounterstrike = (possibleAssassinsPositions.length > 1 ? false : true) && canAssasinBeCaptured
        }
       

        return this.isCheck(color) && !canKingEscape &&   !canWeCounterstrike  

    }

    _findPiecePosition(pieceType, color) {
        return this.pieces
            .find(piece => piece.color === color && piece.name === pieceType)
            .position;
    }

    _getAllEnemiesLegalMoves(color) {
        return this.pieces
            .filter(piece => piece.color !== color)
            .map(piece => piece.position)
            .flatMap(cords => this.legalMoves(cords))
            .filter(cord => cord !== undefined) //nie powinno być undefined, ale na wszelki wypadek to sprawdzam
    }
    _getPossibleAssasinsPositions(color,piecePosition) {
        return this.pieces
            .filter(piece => piece.color !== color)
            .filter(piece => this.legalMoves(piece.position) !== undefined)
            .filter(piece => {
                for (let move of this.legalMoves(piece.position)) {
                    if (move.x === piecePosition.x && move.y === piecePosition.y)
                        return true;
                }
                return false;
            })
            .map(piece => piece.position)
    }



    updateBoardHistory() {
        const newBoardState = new BoardState(this.pieces);
        this.boardHistory.push(newBoardState);
    }



    createPieces() {
        const colors = ['white', 'black'];
        for (let color of colors) {
            this.createPiecesOfGivenColor(color);
        }
    }

    createPiecesOfGivenColor(color) {
        this.createPawns(color);
        this.createRooks(color);
        this.createKnights(color);
        this.createBishops(color);
        this.createQueen(color);
        this.createKing(color);
    }

    createPawns(color) {
        const xArray = [0, 1, 2, 3, 4, 5, 6, 7];
        const y = color === 'white' ? 1 : 6;
        const type = 'Pawn';
        this.createPiecesOfGivenType(xArray, y, color, type);
    }

    createRooks(color) {
        const xArray = [0, 7];
        const y = this.whichRow(color);
        const type = 'Rook';
        this.createPiecesOfGivenType(xArray, y, color, type);
    }

    createKnights(color) {
        const xArray = [1, 6];
        const y = this.whichRow(color);
        const type = 'Knight';
        this.createPiecesOfGivenType(xArray, y, color, type);
    }

    createBishops(color) {
        const xArray = [2, 5];
        const y = this.whichRow(color);
        const type = 'Bishop';
        this.createPiecesOfGivenType(xArray, y, color, type);
    }

    createQueen(color) {
        const xArray = [3];
        const y = this.whichRow(color);
        const type = 'Queen';
        this.createPiecesOfGivenType(xArray, y, color, type);
    }

    createKing(color) {
        const xArray = [4];
        const y = this.whichRow(color);
        const type = 'King';
        this.createPiecesOfGivenType(xArray, y, color, type);
    }

    whichRow(color) {
        return color === 'white' ? 0 : 7;
    }

    createPiecesOfGivenType(xArray, y, color, type) {
        for (let x of xArray) {
            this.pieces.push(this.createPiece(x, y, color, type));
        }
    }

    createPiece(x, y, color, type) {
        const coords = {
            x: x,
            y: y
        };
        switch (type) {
            case 'Pawn':
                return new Pawn(coords, color);
            case 'Rook':
                return new Rook(coords, color);
            case 'Knight':
                return new Knight(coords, color);
            case 'Bishop':
                return new Bishop(coords, color);
            case 'Queen':
                return new Queen(coords, color);
            case 'King':
                return new King(coords, color);
        }
    }
}

export default Board;