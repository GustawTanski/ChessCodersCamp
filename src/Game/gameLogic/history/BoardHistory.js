import BoardState from "./BoardState";

class BoardHistory extends Array {
    /*  brak metod, dodane będą w przyszłości gdyby okazało
        się że potrzebne jest coś poza metodami dostępnymi w Array */
    last() {
        return this[this.length - 1];
    }
}

export default BoardHistory;