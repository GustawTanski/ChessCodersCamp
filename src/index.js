import App from "./App";
import Rook from "./Game/gameLogic/pieces/Rook";

//w tym pliku inicjalizowana będzie aplikacja i prawdopobodnie nic więcej

const app = new App();
const rook = new Rook({x:0,y:0},'black');

rook.legalMoves();

