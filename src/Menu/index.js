// Odpowiedzialność: Kontener łączący interfejs i logikę menu gry
// ! UWAGA ta klasa jest atrapą, trzeba będzie ją jeszcze zaimplementować

class Menu {
	constructor() {}
	// ustawia callback _onStart i przekazuje go w dół
	setOnStart(onStart) {}
	// przyłącza menu do DOMu w wyznaczonym węźle
	mount(node) {}
	// odłącza od DOMu
	unmount() {}
	// przywraca do stanu początkowego
	hardReset() {}
	// czyści wybrane przez użytkownika własciwości, ale nie te ustawione przez programiste
	softReset() {}
}

export default Menu;
