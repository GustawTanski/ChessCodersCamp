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
        [this.computerOpponent, this.computerOpponentLabel] = this.createRadioButtonWithLabel('computer', 'opponent', true, 'Computer', 'computerOpponent');
        [this.humanOpponent, this.humanOpponentLabel] = this.createRadioButtonWithLabel('human', 'opponent', false, 'Human', 'humanOpponent');
        this.opponentGroup.append(this.computerOpponent, this.computerOpponentLabel, this.humanOpponent, this.humanOpponentLabel);

        // Wybór koloru
        this.colorText = this.createElement('h2', 'colorText');
        this.colorText.textContent = 'Your color';

        this.colorGroup = this.createElement('radiogroup', 'colorGroup');
        [this.whiteColor, this.whiteColorLabel] = this.createRadioButtonWithLabel('white', 'color', true, 'White', 'whiteColor');
        [this.blackColor, this.blackColorLabel] = this.createRadioButtonWithLabel('black', 'color', false, 'Black', 'blackColor');
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

    //metoda tworząca radio button z etykietą
    createRadioButtonWithLabel(value, name, checked, label, idName, className) {
        const radioButton = this.createElement('input', idName, className);
        radioButton.type = 'radio';
        radioButton.value = value;
        radioButton.name = name;
        radioButton.checked = checked;
        const radioButtonLabel = this.createElement('label');
        radioButtonLabel.textContent = label;
        radioButtonLabel.setAttribute('for', idName);
        return [radioButton, radioButtonLabel];
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
        Array.from(this.view.getElement('#colorGroup').children).forEach(child => {
            if (child.type == 'radio' && child.checked == true) {
                this.model.color = child.value;
            }
        })
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