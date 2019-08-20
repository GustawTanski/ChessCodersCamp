import "./board.css";
import BoardState from "../gameLogic/history/BoardState"
import InterfaceField from "./InterfaceField"

export default class InterfaceBoard{
    /**
     * Constructor creating a new chessboard node within specified parent node
     * @param {*} parentNode parent node. The board will be created on a new <div> within the specified node.
     * @param {*} onFieldClick the function to be called with field's coordinates ({x:0,y:0} object) when the field is clicked.
     */
    constructor(parentNode, onFieldClick = function(coords){
        console.log("Click on field "+InterfaceBoard.fieldNameFromCoords(coords))
    })
    {
        let node = document.createElement("div");
        this._node = node;
        parentNode.appendChild(node);
        node.id = "chessboard";
        this._node.classList.add("orientation--white");

        this._fields = [];
        this._currentPosition = this._emptyPositionArray();

        this._onFieldClick = onFieldClick;

        for(let i=0;i<8;i++){
            this._fields.push([]);
            for(let j=0;j<8;j++){
                let coords = {x: i,y: j};
                let field = new InterfaceField(coords, this._onFieldClick);

                node.appendChild(field.node);
                this._fields[i][j] = field;
            }
        }
    }

    /**
     * Returns the node the InterfaceBoard is built on
     */
    get node(){
        return this._node;
    }

    /**
     * Switches between white- and black-side player's perspective of the board
     */
    switchPerspective(){
        this._node.classList.toggle("orientation--white");
        this._node.classList.toggle("orientation--black");
    }

    /**
     * Substitutes existing position with the new one
     * @param {BoardState} boardState 
     * @param {boolean} fullReset specifies whether pieces unchanged between positions should be removed prior to setting the new position
     */
    setPosition(boardState = new BoardState([]), fullReset = false) {
        let newPosition = this._positionFromBoardstate(boardState);

        this.clearHighlights();
        if(fullReset){
            this.clearPieces();
        }

        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                let coords = {x: i, y: j}

                if(newPosition[i][j]){
                    let piece = newPosition[i][j].piece.toLowerCase();
                    let color = newPosition[i][j].color;
                    this.placePiece(coords,piece,color);
                }
                else if(this._currentPosition){
                    this.clearPieces(coords);
                }
            }
        }
    }

    /**
     * Places a new chess piece on field specified by coordinates (if there's a piece present there, it gets replaced)
     * @param {Object} coords coordinates of the field where the piece is to be placed (as {x:0, y:0} object)
     * @param {String} piece name of the chess piece (pawn, rook, knight, bishop, queen or king)
     * @param {String} color color of the chess piece (white or black)
     */
    placePiece(coords, piece, color){
        const field = this._fields[coords.x][coords.y];
        field.placePiece(piece,color);

        this._currentPosition[coords.x][coords.y] = field.currentPiece;
    }

    /**
     * Removes piece(s) from the specified fieldd or the entire board if no field is specified.
     * @param {Object} coords coordinates of the field to be cleared (entire board will be cleared if no argument is provided)
     */
    clearPieces(coords = null){
        if(coords){
            this._fields[coords.x][coords.y].removePiece();
            this._currentPosition[coords.x][coords.y] = null;
        }
        else{
            for(let i=0;i<this._fields.length;i++){
                for(let j=0;j<this._fields.length;j++){
                    this._fields[i][j].removePiece();
                    this._currentPosition[i][j] = null;
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
        const piece = originField.currentPiece;
        
        this.clearPieces(originCoords);
        this.placePiece(targetCoords,piece.piece,piece.color);
    }

    /**
     * Highlights the fields specified by coordinates
     * @param {Object[]} coordsArray array of coordinates specified as {x:0, y:0} object
     */
    highlightFields(coordsArray){
        this.clearHighlights();
        for(let i=0;i<coordsArray.length;i++){
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

    /**
     * Helper method translating the BoardState object format to 2-dimensional array of InterfacePiece objects
     * @param {BoardState} boardState 
     */
    _positionFromBoardstate(boardState){
        let boardstatePosition = boardState.boardState;
        let position = this._emptyPositionArray();
        for (let i = 0; i < boardstatePosition.length; i++) {
            let x = boardstatePosition[i].position.x;
            let y = boardstatePosition[i].position.y;
            let pieceName = boardstatePosition[i].name.toLowerCase();
            let pieceColor = boardstatePosition[i].color;
            position[x][y] = new InterfacePiece(pieceName, pieceColor);
        }
        return position;
    }

    /**
     * Helper method creating empty 8x8 array
     */
    _emptyPositionArray(){
        let position = [];
        for(let i=0;i<8;i++){
           position.push([]);
            for(let j=0;j<8;j++){
                position[i][j] = null;
            }
        }
        return position;
    }
}