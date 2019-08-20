/**
 * Supporting class for the InterfaceBoard - this class and its methods should never be accessed from outside InterfaceBoard or itself.
 */
class InterfacePiece{
    constructor(piece, color){
        this._piece = piece;
        this._color = color;
        this._node = null;
    }

    get piece(){
        return this._piece;
    }
    get color(){
        return this._color;
    }

    /**
     * Returns the <div> node representing the piece. The node is created on first call.
     */
    get node(){
        if(!this._node){
            this._setUpNode();
        }
        return this._node;
    }
    
    /**
     * Simple method comparing whether the argument piece is logically equal (is the same kind and color) to the one it's being compared to.
     * This method does NOT check position and node bindings - two white pawns will always be equal regardless of where they are.
     * @param {InterfacePiece} otherPiece the piece to be compared
     */
    equals(otherPiece){
        return otherPiece && this.piece===otherPiece.piece && this.color===otherPiece.color;
    }

    /**
     * Helper method creating the visual representation of the piece as a <div> node with appropriate classes for CSS styling
     */
    _setUpNode(){
        let pieceNode = document.createElement("div");
        pieceNode.classList.add("piece");

        switch(this._piece){
            case "king":
                pieceNode.classList.add("k");
                break;
            case "queen":
                pieceNode.classList.add("q");
                break;
            case "rook":
                pieceNode.classList.add("r");
                break;
            case "bishop":
                pieceNode.classList.add("b");
                break;
            case "knight":
                pieceNode.classList.add("kn");
                break;
            case "pawn":
                pieceNode.classList.add("p");
                break;
            default:
                pieceNode.classList.add("p");
        }

        if(this._color==="black"){
            pieceNode.classList.add("bl");
        }
        else{
            pieceNode.classList.add("wh");
        }

        this._node = pieceNode;
    }
}