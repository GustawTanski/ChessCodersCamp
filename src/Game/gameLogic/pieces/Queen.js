import Piece from './Piece'

const direction = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down'
}

class Queen extends Piece {

    constructor(position, color) {
        super(position, color);       
    }

    legalMoves(boardState) {
        const board2d = boardState.toTwoDimensionArray();
        const possiblePositions = [];
        possiblePositions.push(this._addBothPerpendicular(board2d));
        possiblePositions.push(this._addBothDiagonal(board2d));
        const enemyPossiblePositons = possiblePositions.filter(pos =>
            board2d[pos.x][pos.y].color !== pos.color
        )
        return enemyPossiblePositons;    
    }

    _addBothPerpendicular(board2d) {
        const arr = [];
        arr.push(this._addVertical(board2d));
        arr.push(this._addHorizontal(board2d));
        return arr;
    }

    _addVertical(board2d) {
        const arr = [];
        for (let i = 0; i < 8 && board2d[i][this._position.y] == null; i++)
            if (i !== this._position.x)
                possiblePositions.push({
                    x: i,
                    y: this._position.y
                })
        return arr;
    }

    _addHorizontal(board2d) {
        const arr = [];
        for (let i = 0; i < 8 && board2d[i][this._position.y] == null ; i++)
            if (i !== this._position.y)
                possiblePositions.push({
                    x: this._position.x,
                    y: i
                })
        return arr;
    }


    _addBothDiagonal(board2d) {
        const arr = [];
        arr.push(_addHalfDiagonal(direction.RIGHT, direction.UP, board2d));
        arr.push(_addHalfDiagonal(direction.RIGHT, direction.DOWN, board2d));
        arr.push(_addHalfDiagonal(direction.LEFT, direction.UP, board2d));
        arr.push(_addHalfDiagonal(direction.LEFT, direction.DOWN, board2d));
        return arr;
    }

    _addHalfDiagonal(xDirection, yDirection, board2d) {
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
                }) && board2d[i + xIncrement][j + yIncrement] == null; j++) {
                arr.push({
                    x: i + xIncrement,
                    y: j + yIncrement
                })
            }
        return arr;
    }
}

export default Queen;