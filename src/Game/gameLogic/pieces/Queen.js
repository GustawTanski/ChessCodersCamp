import Piece from './Piece'

const direction = {
    ASC: 'asc', //ascending (up or right)
    DESC: 'desc',//descending (down or left)
    NONE: 'none'
}

class Queen extends Piece {

    constructor(position, color) {
        super(position, color);
    }

    legalMoves(boardState) {
        // const board2d = [
        //     [],
        //     [],
        //     [],
        //     [],
        //     [],
        //     [],
        //     [],
        //     []
        // ];
        // for (let i = 0; i < 8; i++)
        //     for (let j = 0; j < 8; j++)
        //         board2d[i].push(undefined);
        // board2d[4][6] = new Queen({
        //     "x": 4,
        //     "y": 6
        // }, "black")
        // board2d[6][4] = new Queen({
        //     "x": 6,
        //     "y": 4
        // }, "white")
        // board2d[2][2] = new Queen({
        //     "x": 2,
        //     "y": 2
        // }, "white")
        // board2d[6][6] = new Queen({
        //     "x": 6,
        //     "y": 6
        // }, "black")

        // console.log(board2d)
        const board2d = boardState.toTwoDimensionArray();
        const possiblePositions = [];
        possiblePositions.push(...(this._addPerpendicular(board2d)));
        possiblePositions.push(...(this._addDiagonal(board2d)));
        return possiblePositions;
    }

    _addPerpendicular(board2d) {
        const arr = [];
        arr.push(...(this._addHalfAxis(direction.NONE, direction.ASC, board2d)));
        arr.push(...(this._addHalfAxis(direction.NONE, direction.DESC, board2d)));
        arr.push(...(this._addHalfAxis(direction.DESC, direction.NONE, board2d)));
        arr.push(...(this._addHalfAxis(direction.ASC, direction.NONE, board2d)));
        return arr;
    }

    _addDiagonal(board2d) {
        const arr = [];
        arr.push(...(this._addHalfAxis(direction.ASC, direction.ASC, board2d)));
        arr.push(...(this._addHalfAxis(direction.ASC, direction.DESC, board2d)));
        arr.push(...(this._addHalfAxis(direction.DESC, direction.ASC, board2d)));
        arr.push(...(this._addHalfAxis(direction.DESC, direction.DESC, board2d)));
        return arr;
    }

    _addHalfAxis(xDirection, yDirection, board2d) {
        const arr = [];
        const xIncrement = this._getIncrement(xDirection);
        const yIncrement = this._getIncrement(yDirection);

        //Brzydki rozbudowany warunek, sprawdza czy na kolejnym polu jest przeciwnik albo czy pole jest puste i potem je dodaje
        //Niezbyt SOLID, 
        for (let i = this.position.x, j = this.position.y; 

            !this._isOutOfTheBoard({
                x: i + xIncrement,
                y: j + yIncrement
            }) && (board2d[i + xIncrement][j + yIncrement] == undefined ||
                board2d[i + xIncrement][j + yIncrement].color !== this.color);
                
                 i += xIncrement, j += yIncrement) {
            arr.push({
                x: i + xIncrement,
                y: j + yIncrement
            });
            //uniemożliwia przeskakiwanie przez pionki
            if (board2d[i + xIncrement][j + yIncrement] != undefined && board2d[i + xIncrement][j + yIncrement].color !== this.color)
                break;
        }

        return arr;
    }

    _getIncrement(direction) {
        switch (direction) {
            case 'asc':
                return 1;
                break;
            case 'desc':
                return -1;
                break;
            case 'none':
                return 0;
                break;
        }
    }
}

export default Queen;