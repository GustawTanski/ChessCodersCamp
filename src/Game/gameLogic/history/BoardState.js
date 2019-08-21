class BoardState {
    constructor(board) {
        this._boardState = BoardState.flatten(board);
        Object.freeze(this._boardState);
    }

    get boardState() {
        return this._boardState;
    }

    /* 
        Mapuje dwuwymiarową tablicę obiektów typu Piece
        do dwuwymiarowej tablicy obiektów przechowujących
        ich parametry w spłaszczonej strukturze:
        {
            name: "bishop",
            position: {x: 1, y: 5},
            color: "black"
        }
    */
    static flatten(board) {
        let boardState = new Array();

        for (let piece of board) {
            boardState.push({
                name: piece.constructor.name,
                position: piece.position,
                color: piece.color
            });
        }

        return boardState;
    }

    /*
        Mapuje właściwość _boardState do dwuwymiarowej tablicy
        reprezentującej ułożenie pionków na planszy.
    */
    toTwoDimensionArray() {
        const array2d = new Array(8);

        // Inicjalizacja dwuwymiarowej tablicy
        for (let i = 0; i < array2d.length; ++i) {
            array2d[i] = new Array(8);
        }

        for (let flatPiece of this._boardState) {
            array2d[flatPiece.position.x][flatPiece.position.y] = flatPiece;
        }

        return array2d;
    }
}

export default BoardState;