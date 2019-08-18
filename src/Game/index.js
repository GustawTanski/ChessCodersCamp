// Odpowiedzalność: zarządzanie przebiegiem gry
import Board from "./gameLogic/Board";
import InterfaceBoard from "./boardInterface/InterfaceBoard";
import BoardHistory from "./gameLogic/history/BoardHistory";

class Game {
	constructor(configurations = {}) {
		this._board = new Board();
		this._node = configurations.node || document.querySelector("#root");
		this._interface = new InterfaceBoard(
			this._node,
			this._onFieldClicked.bind(this)
		);
		this._activePiece = null;
		this._currentPlayer = "white";
		this._currentLegalMoves = [];
		// z obiektu konfiguracyjnego będą pobierane opcje, póki co niech będzie pusto
		// this._history = configurations.history;
		// tutaj dalej będą ustawiane callbacki
	}

	start() {
		// sprawdza czy dostarczona jakąś historie gry
		if (!(this._history instanceof BoardHistory)) this._startNewGame();
		else this._startGameWithHistory();
	}

	_onFieldClicked(coords) {
		if (this._isMoveLegal(coords)) this._onHighlightedFieldClicked(coords);
		else {
			const piece = this._board.findPiece(coords);

			// czy znaleziono figurę
			if (piece) this._onPieceClicked(coords, piece);
			else this._blur();
		}
	}

	_onHighlightedFieldClicked(coords) {
		const newBoardState = this._board.movePiece(
			this._activePiece.position,
			coords
		);
		console.log(newBoardState);
		this._interface.setPosition(newBoardState);
		this._nextMove();
	}

	_onPieceClicked(coords, piece) {
		// czy to figura gracza, który ma ruch)
		if (piece.color != this._currentPlayer) return;
		console.log("jestem tu");
		// ustawia pionek jako aktywny
		this._activePiece = piece;
		// sprawdza możliwe ruchy
		this._currentLegalMoves = this._board.legalMoves(coords);
		console.log(this._currentLegalMoves);
		// podświetla dozwolone ruchy
		this._interface.highlightFields(this._currentLegalMoves);
	}

	_nextMove() {
		this._changePlayer();
		/*
		tutaj będzie logika sprawdzająca czy gra się nie skończyła
		*/
		this._blur();
	}

	_blur() {
		// odfocusowuje pola
		this._interface.clearHighlights();
		// czyści dozwolone ruchy
		this._currentLegalMoves = [];
		// czyści aktywną figurę
		this._activePiece = null;
	}

	_isMoveLegal(coords) {
		const { _currentLegalMoves } = this;
		// sprawdza czy są jakiekolwiek dostępne ruchy
		if (!_currentLegalMoves || !_currentLegalMoves.length) return false;
		// sprawdza czy podany ruch jest prawidłowy
		return _currentLegalMoves.some(
			move => move.x == coords.x && move.y == coords.y
		);
	}

	_startNewGame() {
		this._currentPlayer = "white";
		console.log(this._board.boardHistory[0]);
		this._interface.setPosition(this._board.boardHistory[0]);
		// rysuje plansze
		// this.mount();
	}

	_changePlayer() {
		if (this._currentPlayer == "white") this._currentPlayer = "black";
		else this._currentPlayer = "white";
	}

	mount(node = this._node) {
		this._interface.mount(node);
	}

	unmount() {
		this._interface.unmount();
	}
}

export default Game;
