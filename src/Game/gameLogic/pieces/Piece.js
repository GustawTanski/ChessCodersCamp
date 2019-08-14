// klasa abstrakcyjna - od niej będą dziedziczyć wszystkie inne figury
// Odpowiedzialność: zdefiniowanie wszystkich właściwości i metod, które dzielą figury
// Wszystkie klasy z folderu Pieces to klasy logiczne - służą do obliczeń i wewnętrzenej mechaniki gry, nie do
// wyświetlania, ani tworzenia interfejsu
class Piece {
    constructor(position, color) {
        if (this.constructor === Piece) {
            throw new Error("Nie możesz tworzyć obiektów z klasy abstrakcyjnej!");
        }
        //np. {x:3,y:1}...
        this._position = position;
        // np. black or white
        this._color = color;
        // możliwe promocje
        // zmieniłem na wielkie litery - bo nazwy klas GUSTAW
        this.possiblePromotion = ["Queen", "Rook", "Bishop", "Knight"];
        // dodałem, bo w sumie to może gdzieś się przyda GUSTAW
        this._name = this.constructor.name;
    }
    get position() {
        return this._position;
    }
    get color() {
        return this._color;
    }
    get name() {
        return this._name;
    }

    move(toCoords) {
        //metoda odpowiedzialna za poruszanie się pionka
    }

    legalMoves(boardState) {
        // metoda sprawdzająca możliwe ruchy
    }

    pieceLoss() {
        // metoda wywoływana w momencie gdy nasz pionek został zbity
        // this._position={x:null,y:null} ?
        return { x: null, y: null };
    }

    _isOutOfTheBoard(toCoords) {
        //metoda sprawdzająca czy wybrane pole nie jest poza planszą
        //jezeli zwraca TRUE - jest poza plansza
        //jezeli zwraca false - jest dalej na planszy
        const { x: posX, y: posY } = coords;
        if (posX < 0 || posX > 7 || posY < 0 || posY > 7) {
            return true;
        }
        return false;
    }
}

export default Piece;
