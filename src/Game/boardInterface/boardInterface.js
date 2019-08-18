class InterfaceBoard{
    /** 
     * Constructor creating a new board in provided <div>
    */
    constructor(parentNode){
        let node = document.createElement("div");
        this._node = node;
        parentNode.appendChild(node);
        node.id = "chessboard";
        this._node.classList.add("orientation--white");

        this._fields = [];
        this._position = [];

        for(let i=0;i<8;i++){
            this._fields.push([]);
            this._position.push([]);
            for(let j=0;j<8;j++){
                let coords = {x: i,y: j};
                let field = new InterfaceField(coords);

                node.appendChild(field.node);
                this._fields[i][j] = field;
                this._position[i][j] = null;
            }
        }
    }

    get node(){
        return this._node;
    }

    setPosition(boardState = [{boardState: []}]) {
        let newPosition = boardState.boardState;

        this.clearHighlights();
        this.clearPieces();
        for (let i = 0; i < newPosition.length; i++) {
            let coords = {
                x: newPosition[i].newPosition[0],
                y: newPosition[i].newPosition[1]
            }
            let piece = newPosition[i].piece;
            let color = newPosition[i].color;

            this.placePiece(coords, piece, color);
        }
    }


    /**
     * Creates a new chess piece on field specified by coordinates
     * @param {Object} coords coordinates of the field where the piece is to be placed (as {x:0, y:0} object)
     * @param {String} piece name of the chess piece (pawn, rook, knight, bishop, queen or king)
     * @param {String} color color of the chess piece (white or black)
     */
    placePiece(coords, piece, color){
        this._fields[coords.x][coords.y].placePiece(piece,color);
    }

    /**
     * Removes piece(s) from the specified fieldd or the entire board if no field is specified.
     * @param {Object} coords coordinates of the field to be cleared (entire board will be cleared if no argument is provided)
     */
    clearPieces(coords = null){
        if(coords){this._fields[coords.x][coords.y].clearPieces();}
        else{
            for(let i=0;i<this._fields.length;i++){
                for(let j=0;j<this._fields.length;j++){
                    this._fields[i][j].clearPieces();
                }
            }
        }
    }

    /**
     * Moves the div representing the chess piece between fields specified by coordinates
     * @param {Object} originCoords coordinates of the piece to be moved as {x:0, y:0} object
     * @param {Object} targetCoords coordinates of the place the piece should be moved to as {x:0, y:0} object
     */
    move(originCoords, targetCoords){
        const originField = this._fields[originCoords.x][originCoords.y];
        const targetField = this._fields[targetCoords.x][targetCoords.y];
        const piece = originField.pickUpPiece();
        if(piece){
            piece.classList.add("moving");
            const pieceStyle = getComputedStyle(piece);
            const transitionDuration = parseFloat(pieceStyle.transitionDuration);
            setTimeout(function(){
                targetField.putDownPiece(piece);
                setTimeout(function(){
                    piece.classList.remove("moving");
                },100);
            },transitionDuration*1000);
        }
    }

    /**
     * Highlights the fields specified by coordinates
     * @param {Object[]} coordsArray array of coordinates specified as {x:0, y:0} object
     */
    highlightFields(coordsArray){
        this.clearHighlights();
        for(let i=0;i<coordsArray.length;i++){
            console.log(this);
            this._fields[coordsArray[i].x][coordsArray[i].y].applyHighlight();
        }
    }

    /**
     * Clears highlights from all the fields of the board
     */
    clearHighlights(){
        for(let i=0;i<this._fields.length;i++){
            for(let j=0;j<this._fields.length;j++){
                this._fields[i][j].removeHighlight();
            }
        }
    }

    static fieldNameFromCoords(coords){
        return ""+InterfaceBoard.labelX(coords.x)+InterfaceBoard.labelY(coords.y);
    }

    static labelX(xIndex){
        return ['a','b','c','d','e','f','g','h'][xIndex];
    }
    static labelY(yIndex){
        return ""+(yIndex+1);
    }
}

/**
 * Supporting class for the InterfaceBoard - this class and its methods should never be accessed from outside InterfaceBoard or itself.
 */
class InterfaceField {
    /**
     * Constructor creating a single field of the board, with specified coordinates
     * @param {Object} coords coordinates specified as {x:0, y:0} object
     */
    constructor(coords) {
        let fieldColor = (coords.x + coords.y) % 2 ? "white" : "black";
        let fieldName = InterfaceBoard.fieldNameFromCoords(coords);

        let node = document.createElement("div");
        this._node = node;

        node.id = fieldName;
        node.classList.add("field");
        node.classList.add('_' + fieldName[0]);
        node.classList.add('_' + fieldName[1]);
        node.classList.add(fieldColor);

        this._currentPiece = null;
    }

    get node(){
        return this._node;
    }
    
    get currentPiece(){
        return this._currentPiece;
    }

    /**
     * Gets the last piece put on the field
     */
    pickUpPiece(){
        let piece = this._node.querySelector(".piece:last-of-type");
        return piece;
    }

    putDownPiece(piece){
        this._node.appendChild(piece);
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

    clearPieces(){
        let piecesOnField = this._node.querySelectorAll(".piece");
        for(let i=0;i<piecesOnField.length;i++){
            piecesOnField[i].remove();
        }
    }

    removePiece(animationWindow=0){
        let piece = this._currentPiece;
        piece.classList.add("moved");
        this._currentPiece = null;
        setTimeout(function(){
            piece.remove();
        },animationWindow*1000);
    }

    placePiece(piece="pawn", color="white"){
        let pieceLayer = document.createElement("div");
        pieceLayer.classList.add("piece");

        switch(piece){
            case "king":
                pieceLayer.classList.add("k");
                break;
            case "queen":
                pieceLayer.classList.add("q");
                break;
            case "rook":
                pieceLayer.classList.add("r");
                break;
            case "bishop":
                pieceLayer.classList.add("b");
                break;
            case "knight":
                pieceLayer.classList.add("kn");
                break;
            case "pawn":
                pieceLayer.classList.add("p");
                break;
            default:
                pieceLayer.classList.add("p");
        }

        if(color==="black"){
            pieceLayer.classList.add("bl");
        }
        else{
            pieceLayer.classList.add("wh");
        }

        this._node.appendChild(pieceLayer);
    }
}