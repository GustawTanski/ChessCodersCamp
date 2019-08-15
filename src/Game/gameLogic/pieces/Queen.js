import Piece from './Piece'

class Queen extends Piece {

    constructor(position, color) {
        super(position, color);
        const direction = {
            RIGHT: 'right',
            LEFT: 'left',
            UP: 'up',
            DOWN: 'down'
        }
    }

    legalMoves(boardState) {
        const possiblePositions = [];
        possiblePositions.push(this._addBothPerpendicular);
        possiblePositions.push(this._addBothDiagonal);
        const board2d = boardState.toTwoDimensionArray();
        const enemyPossiblePositons = possiblePositions.filter(pos =>
            board2d[pos.x][pos.y].color !== pos.color
        )
        
    }

    _addBothPerpendicular() {
        const arr = [];
        arr.push(this._addVertical);
        arr.push(this._addHorizontal);
        return arr;
    }

    _addVertical() {
        const arr = [];
        for (let i = 0; i < 8; i++)
            if (i !== this._position.x)
                possiblePositions.push({
                    x: i,
                    y: this._position.y
                })
        return arr;
    }

    _addHorizontal() {
        const arr = [];
        for (let i = 0; i < 8; i++)
            if (i !== this._position.y)
                possiblePositions.push({
                    x: this._position.x,
                    y: i
                })
        return arr;
    }


    _addBothDiagonal() {
        const arr = [];
        arr.push(_addHalfDiagonal(direction.RIGHT, direction.UP));
        arr.push(_addHalfDiagonal(direction.RIGHT, direction.DOWN));
        arr.push(_addHalfDiagonal(direction.LEFT, direction.UP));
        arr.push(_addHalfDiagonal(direction.LEFT, direction.DOWN));
        return arr;
    }

    _addHalfDiagonal(xDirection, yDirection) {
        const arr = [];
        const xIncrement = xDirection === 'right' ? 1 : -1;
        const yIncrement = yDirection === 'up' ? 1 : -1;
        for (let i = this._position.x; !this._isOutOfTheBoard({
                x: i + xIncrement,
                y: 0
            }); i++)
            for (let j = this.position.y; !this._isOutOfTheBoard({
                    x: 0,
                    y: j + yIncrement
                }); j++) {
                arr.push({
                    x: i + xIncrement,
                    y: j + yIncrement
                })
            }
        return arr;
    }
}

export default Queen;