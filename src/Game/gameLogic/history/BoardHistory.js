import BoardState from "./BoardState";

class BoardHistory {
    constructor() {
        this._history = [];
    }

    get history() {
        return this._history;
    }

    addToHistory(currentState) {
        this._history.push(new BoardState(currentState));
    }

    undoOneMove() {
        return this._history.pop();
    }
}

export default BoardHistory;