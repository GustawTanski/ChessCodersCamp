import Game from "./Game";
import Menu from "./Menu";

// klasa główna aplikacji
// Odpowiedzialność: kontener porozumiewający ze sobą menu główne i zasadniczą grę
class App {
	constructor() {
		// dwa głowne obiekty/widoki
		this.game = new Game();
		this.menu = new Menu();
	}
	// przykładowa metoda włączająca aplikacje
	init() {
		// aplikacja zaczyna od wyświetlenia menu (to też przykład)
		this.menu.start();
	}
}

export default App;
