// klasa abstrakcyjna - od niej będą dziedziczyć wszystkie inne figury
// Odpowiedzialność: zdefiniowanie wszystkich właściwości i metod, które dzielą figury 
// Wszystkie klasy z folderu Pieces to klasy logiczne - służą do obliczeń i wewnętrzenej mechaniki gry, nie do 
// wyświetlania, ani tworzenia interfejsu
class Piece {
    // przykładowy konstruktor
    constructor(name, currentPosition, colorChess) {
        //np. rook, queen, bishop
        this._name = name;
        //np. [2,5],[x=1,y=3],[x:3,y:1]...
        this._currentPosition = currentPosition;
        //black or white
        this._colorChess = colorChess;
    }
}

export default Piece;