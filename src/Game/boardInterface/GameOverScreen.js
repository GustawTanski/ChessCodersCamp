/**
 * A simple game over screen with a message and a button that closes it and sends notification of that fact via callback
 */
export default class GameOverScreen{
    constructor(parentNode, messageText = "The match has ended.", onClose=function(){console.log("Game over screen has been closed.");}, buttonText = "Close"){

        this._onClose = onClose;

        this._node = document.createElement("div");
        this._node.classList.add("end-screen");

        let contentNode = document.createElement("div");
        contentNode.classList.add("content-container");

        let message = document.createElement("h3");
        message.classList.add("game-message");
        message.innerText = messageText;
        
        let closeButton = document.createElement("button");
        closeButton.classList.add("button--confirm");
        closeButton.innerText = buttonText;
        closeButton.onclick = this._close.bind(this);

        contentNode.appendChild(message);
        contentNode.appendChild(closeButton);
        this._node.appendChild(contentNode);
        parentNode.appendChild(this._node);
    }

    _close(){
        let closingNode = this._node;
        closingNode.classList.add("closed");
        const closingNodeStyle = getComputedStyle(closingNode);
        const animationWindow = parseFloat(closingNodeStyle.transitionDuration);
        if(animationWindow>0){
            setTimeout(function(){
                closingNode.remove();
            },animationWindow*1000);
        }
        else{
            closingNode.remove();
        }

        this._onClose();
    }
}