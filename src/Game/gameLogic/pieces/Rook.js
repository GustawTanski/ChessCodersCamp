//klasa reprezentująca 'Wieżę' 
//Wieża porusza się po liniach pionowych i poziomych, w dowolnym kierunku, o dowolną liczbę niezajętych pól. 
import Piece from "./Piece";

const chessBoard = {
    length: 8,
    height: 8
}

class Rook extends Piece{

    constructor(position, color){
        super(position,color)
    }

    legalMoves(boardState){
        const boardState2D = boardState.toTwoDimensionArray();
        var possibleMoves = []

        // Tworzy możliwe ruchy bez uwzględnienia pozostalych pionków
        for (let possibleX = this.position.x - 1; possibleX >= 0; possibleX--) {
            if(!boardState2D[possibleX][this.position.y]){
                possibleMoves.push({
                    x: possibleX,
                    y: this.position.y
                })
            } else {
                break;
            }
        }   

        for (let possibleX = this.position.x + 1; possibleX < chessBoard.length; possibleX++) {
            if(!boardState2D[possibleX][this.position.y]){
                possibleMoves.push({
                    x: possibleX,
                    y: this.position.y
                })
            } else {
                break;
            }
        }   

        for (let possibleY = this.position.y -1; possibleY >= 0; possibleY--) {
            if(!boardState2D[this.position.x][possibleY]){
                possibleMoves.push({
                    x: this.position.x,
                    y: possibleY
                })
            } else {
                break;
            }
        }

        for (let possibleY = this.position.y + 1; possibleY < chessBoard.height; possibleY++) {
            if(!boardState2D[this.position.x][possibleY]){
                possibleMoves.push({
                    x: this.position.x,
                    y: possibleY
                })
            } else {
                break;
            }
        }

        return possibleMoves;
    }
}

export default Rook;