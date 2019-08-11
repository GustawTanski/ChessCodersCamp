// klasa abstrakcyjna - od niej będą dziedziczyć wszystkie inne figury
// Odpowiedzialność: zdefiniowanie wszystkich właściwości i metod, które dzielą figury 
// Wszystkie klasy z folderu Pieces to klasy logiczne - służą do obliczeń i wewnętrzenej mechaniki gry, nie do 
// wyświetlania, ani tworzenia interfejsu
class Piece {
    constructor(name, currentPosition, colorChess, movePoint, moveDirection) {
        //np. rook, queen, bishop
        this._name = name;
        //np. [2,5],[x=1,y=3],[x:3,y:1]...
        this.currentPosition = currentPosition;
        // np. black or white
        this._colorChess = colorChess

        this._movePoint = movePoint;

        //informuje o tym by zaznaczyc pola ruchu pionka
        this.colorField = false;
        // informuje o tym by zaznaczyć/wyróżnić aktualnie kliknięty pionek
        this.activeChess = false;


        // // np. forwardOnly,diagonally,leftAndRight
        // this._moveDirection = moveDirection;
    }

    moveChess() {
        //metoda odpowiedzialna za poruszanie się pionka
    }

    checkMoveChess() {
        // metoda sprawdzająca czy dany ruch jest możliwy
    }

    onClickShowActiveChess() {
        !this.activeChess;
        return this.activeChess;
    }

}

export default Piece;