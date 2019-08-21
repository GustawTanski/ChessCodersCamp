import InterfaceBoard from "./InterfaceBoard"
import InterfacePiece from "./InterfacePiece"

/**
 * Supporting class for the InterfaceBoard - this class and its methods should never be accessed from outside InterfaceBoard or itself.
 */
export default class InterfaceField {
    /**
     * Constructor creating a single field of the board, with specified coordinates
     * @param {Object} coords  - coordinates in the {x:0,y:0} object format
     * @param {Function} onClick - the function to be called with field's coordinates ({x:0,y:0} object) when the field is clicked
     */
    constructor(coords, onClick) {
        let fieldColor = (coords.x + coords.y) % 2 ? "white" : "black";
        let fieldName = InterfaceBoard.fieldNameFromCoords(coords);

        let node = document.createElement("div");
        this._node = node;
        this._coords = coords;
        this._onClick = onClick;

        node.id = fieldName;
        node.classList.add("field");
        node.classList.add('_' + fieldName[0]);
        node.classList.add('_' + fieldName[1]);
        node.classList.add(fieldColor);

        node.onclick = function(){
            this._onClick(this._coords);
        }.bind(this);

        this._currentPiece = null;
    }

    get node(){
        return this._node;
    }
    
    get currentPiece(){
        return this._currentPiece;
    }

    isEmpty(){
        return !this._currentPiece;
    }

    toggleHighlight(){
        this._node.classList.toggle("highlighted");
    }

    applyHighlight(){
        this._node.classList.add("highlighted");
    }

    removeHighlight(){
        this._node.classList.remove("highlighted");
    }

    /**
     * Removes the current piece from the field. Logical removal is immediate, actual removal from DOM is delayed by the time of exit transition
     */
    removePiece(){
        if(this._currentPiece){
            let removedPieceNode = this._currentPiece.node;
            this._currentPiece = null;

            if(removedPieceNode){
                removedPieceNode.classList.add("moving");
                const removedPieceStyle = getComputedStyle(removedPieceNode);
                const animationWindow = parseFloat(removedPieceStyle.transitionDuration);

                if(animationWindow>0){
                    setTimeout(function(){
                        removedPieceNode.remove();
                    },animationWindow*1000);
                }
                else{
                    removedPieceNode.remove();
                }
            }
        }
    }

    /**
     * Sets the field to contain the piece specified. If a piece is already present, it gets replaced.
     * @param {String} piece type of the piece
     * @param {String} color color of the piece
     */
    placePiece(piece="pawn", color="white"){
        let newPiece = new InterfacePiece(piece,color,null);
        if(!newPiece.equals(this._currentPiece)){
            this.removePiece();
            this._currentPiece = newPiece;
            this._node.appendChild(this._currentPiece.node);
        }
    }
}