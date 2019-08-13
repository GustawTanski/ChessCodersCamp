class Board {
    constructor() {
        this.pieces = new Array();
        this.boardHistory = new BoardHistory();
        this.createPieces();
    }


    movePiece(fromCoords, toCoords) {
        if (this.findPiece(fromCoords).move(toCoords)) {
            return true;
        }
        return false;
    }

    legalMoves(coords) {
        return this.findPiece(coords).legalMoves(this.boardHistory);
    }

    findPiece(coords) {
        return this.pieces.find(piece => piece.position.x === coords.x && piece.position.y === coords.y);
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