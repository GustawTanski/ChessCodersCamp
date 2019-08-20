class Model {

    // pola reprezentują przeciwnika i kolor
    // w konstruktorze zostają im nadane domyślne wartości
    constructor() {
        this._opponent = 'computer';
        this._color = 'white';
    }

    get opponent() {
        return this._opponent;
    }

    set opponent(opponent) {
        this._opponent = opponent;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
    }
}


class View {
    constructor() {

        // Div w którym będą umieszczone elementy
        this.app = this.getElement('#root');

        // Tytuł
        this.title = this.createElement('h1');
        this.title.textContent = 'Chess game';

        // Wybór przeciwnika
        this.opponentText = this.createElement('h2');
        this.opponentText.textContent = 'Opponent';

        this.opponentGroup = this.createElement('radiogroup', 'opponentGroup');

        this.computerOpponent = this.createElement('input', 'computerOpponent');
        this.computerOpponent.type = 'radio';
        this.computerOpponent.name = 'opponent';
        this.computerOpponent.checked = 'true';
        this.computerOpponentLabel = this.createElement('label');
        this.computerOpponentLabel.textContent = 'Computer';
        this.computerOpponentLabel.setAttribute('for', 'computerOpponent');

        this.humanOpponent = this.createElement('input', 'humanOpponent');
        this.humanOpponent.type = 'radio';
        this.humanOpponent.name = 'opponent';
        this.humanOpponentLabel = this.createElement('label');
        this.humanOpponentLabel.textContent = 'Human';
        this.humanOpponentLabel.setAttribute('for', 'humanOpponent');

        this.opponentGroup.append(this.computerOpponent, this.computerOpponentLabel, this.humanOpponent, this.humanOpponentLabel);

        // Wybór koloru
        this.colorText = this.createElement('h2', 'colorText');
        this.colorText.textContent = 'Your color';

        this.colorGroup = this.createElement('radiogroup', 'colorGroup');

        this.whiteColor = this.createElement('input', 'whiteColor');
        this.whiteColor.type = 'radio';
        this.whiteColor.name = 'color';
        this.whiteColor.checked = 'true';
        this.whiteColorLabel = this.createElement('label');
        this.whiteColorLabel.textContent = 'White';
        this.whiteColorLabel.setAttribute('for', 'whiteColor');

        this.blackColor = this.createElement('input', 'blackColor');
        this.blackColor.type = 'radio';
        this.blackColor.name = 'color';
        this.blackColorLabel = this.createElement('label');
        this.blackColorLabel.textContent = 'Black';
        this.blackColorLabel.setAttribute('for', 'blackColor');

        this.colorGroup.append(this.whiteColor, this.whiteColorLabel, this.blackColor, this.blackColorLabel);

        // Przycisk rozpoczęcia gry
        this.play = this.createElement('button', 'play');
        this.play.textContent = 'Play';

        this.app.append(this.title, this.opponentText, this.opponentGroup,
            this.colorText, this.colorGroup, this.play);

        this.showColorChoice();
    }

    // metoda tworząca element z możliwością nadania id i klasy
    createElement(tag, idName, className) {
        const element = document.createElement(tag);
        if (idName) element.id = idName;

        if (className) element.classList.add(className);

        return element;
    }

    // metoda zwracająca element
    getElement(selector) {

        return document.querySelector(selector);
    }

    // ukrywa wybór koloru
    hideColorChoice() {
        this.colorText.hidden = true;
        this.colorGroup.hidden = true;
    }

    // wyświelta wybór koloru
    showColorChoice() {
        this.colorText.hidden = false;
        this.colorGroup.hidden = false;
    }

    // przydziela uchwyt do funkcji wywoływanej po kliknięciu na przeciwnika-człowieka
    bindHumanOpponentClicked(handler) {
        this.humanOpponent.addEventListener('click', event => {
            handler();
        })
    }

    // przydziela uchwyt do funkcji wywoływanej po kliknięciu na przeciwnika-komputera
    bindComputerOpponentClicked(handler) {
        this.computerOpponent.addEventListener('click', event => {
            handler();
        })
    }

    bindWhiteColorClicked(handler) {
        this.whiteColor.addEventListener('click', event => {
            handler();
        })
    }

    bindBlackColorClicked(handler) {
        this.blackColor.addEventListener('click', event => {
            handler();
        })
    }

    bindPlayClicked(handler) {
        this.play.addEventListener('click', event => {
            handler();
        })
    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindComputerOpponentClicked(this.handleComputerOpponentClicked);
        this.view.bindHumanOpponentClicked(this.handleHumanOpponentClicked);
        this.view.bindWhiteColorClicked(this.handleWhiteColorClicked);
        this.view.bindBlackColorClicked(this.handleBlackColorClicked);
        this.view.bindPlayClicked(this.handlePlayClicked);
    }

    // dla wyboru człowieka-przeciwnika kolor jest ustawiony na undefined
    // wybór koloru znika
    handleHumanOpponentClicked = () => {
        this.model.opponent = 'human';
        this.model.color = undefined;
        this.view.hideColorChoice();
    }

    // dla wyboru komputera-przeciwnika
    // wybór koloru zostaje wyświetlony
    handleComputerOpponentClicked = () => {
        this.model.opponent = 'computer';
        this.model.color = 'white';
        this.view.showColorChoice();
    }

    handleWhiteColorClicked = () => {
        this.model.color = 'white';
    }

    handleBlackColorClicked = () => {
        this.model.color = 'black';
    }

    handlePlayClicked = () => {
        //wyświetla aktualny model
        console.log(this.model);
    }
}

const app = new Controller(new Model(), new View())