//klasa reprezentująca 'Wieżę' 
//Wieża porusza się po liniach pionowych i poziomych, w dowolnym kierunku, o dowolną liczbę niezajętych pól. 
import Piece from "./Piece";
import { isDeepStrictEqual } from "util";

// Obiekt służacy do określenia wymiarów szachownicy
const chessBoard = {
    length: 8,
    height: 8
}

class Rook extends Piece{

    constructor(position, color){
        super(position,color)
    }

    //metoda zwracające tablice współrzędnych, z dostępnymi ruchami pionka
    legalMoves(boardState){

        const boardState2D = boardState.toTwoDimensionArray();
        var possibleMoves = []
 
        this._checkLegalPositionsInDirection(boardState2D, possibleMoves,this.position.x - 1,-1,-1,'x')
        this._checkLegalPositionsInDirection(boardState2D, possibleMoves,this.position.x + 1,chessBoard.length,1,'x')
        this._checkLegalPositionsInDirection(boardState2D, possibleMoves,this.position.y - 1,-1,-1,'y')
        this._checkLegalPositionsInDirection(boardState2D, possibleMoves,this.position.y + 1,chessBoard.height,1,'y')

        return possibleMoves;
    }

    // metoda iterująca po polach szachownicy w jednych z określonych kierunków (N,E,S,W)
    // sprawdza czy dany pionek jest innego koloru niż wybrany pionek i wówczas gdy tak jest
    // to go dodaje do tablicy `possibleMoves`
    _checkLegalPositionsInDirection(boardState, possibleMoves, startingCoordinate, endingCoordinate, incrementValue, xOrY){
        var element;

        for (let coordinate = startingCoordinate; coordinate !== endingCoordinate; coordinate += incrementValue) {
            xOrY.toLowerCase() === 'x' ? element = boardState[coordinate][this.position.y]
            :   element = boardState[this.position.x][coordinate]

            if(!element){
                this._pushElement(possibleMoves,xOrY,this.position.x,this.position.y,coordinate)                
                
            } else if(element.color !== this.color){
                this._pushElement(possibleMoves,xOrY,this.position.x,this.position.y,coordinate)
                break;

            } else{
                break;
            }
        }   
    }

    // metoda dodaje do tablicy `array` jedną współrzędną stałą oraz jedną iterowaną.
    // Iterowaną współrzędną jest ta ktora została określona w parametrze `iteratingOverXorY`
    _pushElement(array, iteratingOverXorY, baseX, baseY, iteratingCoordinate){
        if(iteratingOverXorY.toLowerCase() === 'x'){
            array.push({
                x: iteratingCoordinate,
                y: baseY
            })
        } else {
            array.push({
                x: baseX,
                y: iteratingCoordinate
            })
        }
    }
}

export default Rook;