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
        console.log('legalMoves')
        const boardState2D = boardState.toTwoDimensionArray();

        for (let possibleX = 0; possibleX < chessBoard.length; possibleX++) {
            boardState2D[possibleX,this.position.y] = 'X'
        }   

        for (let possibleY = 0; possibleY < chessBoard.length; possibleY++) {
            boardState2D[this.position.x,possibleY] = 'Y'
        }   

        console.log(boardState);
    }
}

export default Rook;