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