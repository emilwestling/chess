class Piece {
    constructor(color, square) {
      this.color = color;
      this.hasMoved = false;
      this.square = square;
    }
  
    isValidMove(toSquare, board) {
        return false;
    }

    moveTo(toSquare) {
        this.square = toSquare;
    }

    moved() {
        this.hasMoved = true;
    }


    getColor() {
        return this.color;
    }

    hasMoved() {
        return this.hasMoved;
    }

    getSquare() {
        return this.square;
    }

    getColumn() {
        return this.square[0];
    }

    getRow() {
        return Number(this.square[1]);
    }
}
  
class Pawn extends Piece {
    isValidMove(toSquare, board) {
        if (this.color === 'white' && this.hasMoved === true) {
            if (toSquare[0] == this.getColumn() && toSquare[1] == this.getRow() + 1) {
                return true;
            }
        }
        else if (this.color == 'black' & this.hasMoved == true) {
            if (toSquare[0] == this.getColumn() && toSquare[1] == this.getRow() - 1) {
                return true;
            }
        }
        else if (this.color == 'white' & this.hasMoved == false) {
            if (toSquare[0] == this.getColumn() && (toSquare[1] == this.getRow() + 1 || toSquare[1] == this.getRow() + 2)) {
                return true;
            }
        }
        else if (this.color == 'black' & this.hasMoved == false) {
            if (toSquare[0] == this.getColumn() && (toSquare[1] == this.getRow() - 1 || toSquare[1] == this.getRow() - 2)) {
                return true;
            }
        }
        return false;
    }

// identifies if a pawn can capture a piece
    canCapture(toSquare) {
        if (this.color == 'white') {
            if (this.#isAdjacentColumns(toSquare) && toSquare[1] == this.getRow() + 1) {
                return true;
            }
            else if (this.#isAdjacentColumns(toSquare) && toSquare[1] == this.getRow() + 1) {
                return true;
            }
        }
        else if (this.color == 'black') {
            if (this.#isAdjacentColumns(toSquare) && toSquare[1] == this.getRow() - 1) {
                return true;
            }
            else if (this.#isAdjacentColumns(toSquare) && toSquare[1] == this.getRow() - 1) {
                return true;
            }
        }
        return false;
    }

    #isAdjacentColumns(toSquare) {
        if (this.getColumn() == 'a') {
            if (toSquare[0] == 'b') {
                return true;
            }
        }
        else if (this.getColumn() == 'h') {
            if (toSquare[0] == 'g') {
                return true;
            }
        }
        else {
            var diff = this.getColumn().charCodeAt(0) - toSquare[0].charCodeAt(0);
            if (diff == 1 || diff == -1) {
                return true;
            }
        }
        
    }
    
    // identifies if a pawn is on the promotion square
    isPromotionSquare() {
        if (this.color === 'white' && this.square[1] == 8) {
            return true;
        }
        else if (this.color === 'black' && this.sqaure[1] == 1) {
            return true;
        }
        return false;
    }
}

  
class Rook extends Piece {
    isValidMove(toSquare) {
        if (this.getColumn() == toSquare[0] || this.getRow() == toSquare[1]) {
            return true;
        }
        return false;
    }
}

class Knight extends Piece {
    isValidMove(toSquare) {
        var diffColumn = Math.abs(this.getColumn().charCodeAt(0) - toSquare[0].charCodeAt(0));
        var diffRow = Math.abs(this.getRow() - toSquare[1]);
        if (diffColumn == 2 && diffRow == 1) {
            return true;
        }
        else if (diffColumn == 1 && diffRow == 2) {
            return true;
        }
        return false;
    }
}

class Bishop extends Piece {
    isValidMove(toSquare) {
        if (Math.abs(this.getColumn().charCodeAt(0) - toSquare[0].charCodeAt(0)) == Math.abs(this.getRow() - toSquare[1])) {
            return true;
        }
        return false;
    }
}

class Queen extends Piece {
    isValidMove(toSquare) {
        // check if the squares are in the same row or column
        if (this.getColumn() == toSquare[0] || this.getRow() == toSquare[1]) {
            return true;
        }
        // check if the squares are in the same diagonal
        else if (Math.abs(this.getColumn().charCodeAt(0) - toSquare[0].charCodeAt(0)) == Math.abs(this.getRow() - toSquare[1])) {
            return true;
        }
        return false;
    }
}

class King extends Piece {
    constructor(color, square) {
        super(color, square);
        this.castled = false;
    }

    isValidMove(toSquare) {
        var diffColumn = Math.abs(this.getColumn().charCodeAt(0) - toSquare[0].charCodeAt(0));
        var diffRow = Math.abs(this.getRow() - toSquare[1]);
        if (diffColumn <= 1 && diffRow <= 1) {
            return true;
        }
        // check if castling is valid
        if (this.castled == false && this.hasMoved == false) {
            const newSquare = toSquare[0]
            if (newSquare == 'g' || newSquare == 'c') {
                return true;
            }
        }
        return false;
    }

    moveTo(toSquare) {
        super.moveTo(toSquare);
        if (this.castled == false && this.hasMoved == false) {
            this.castled = true;
        }
    }
}

class ChessBoard {
    constructor() {
        this.board = [];
        this.turn = 'white';
        this.whiteKing = null;
        this.blackKing = null;
    }

    // creates the board
    createBoard() {
        for (var i = 0; i < 8; i++) {
            this.board[i] = [];
            for (var j = 0; j < 8; j++) {
                this.board[i][j] = null;
            }
        }
    }

    // places the pieces on the board
    placePieces() {
        // place white pieces
        this.board[0][0] = new Rook('white', 'a1');
        this.board[1][0] = new Knight('white', 'b1');
        this.board[2][0] = new Bishop('white', 'c1');
        this.board[3][0] = new Queen('white', 'd1');
        this.board[4][0] = new King('white', 'e1');
        this.whiteKing = this.board[4][0];
        this.board[5][0] = new Bishop('white', 'f1');
        this.board[6][0] = new Knight('white', 'g1');
        this.board[7][0] = new Rook('white', 'h1');
        for (var i = 0; i < 8; i++) {
            this.board[i][1] = new Pawn('white', String.fromCharCode(97 + i) + '2');
        }

        // place black pieces
        this.board[0][7] = new Rook('black', 'a8');
        this.board[1][7] = new Knight('black', 'b8');
        this.board[2][7] = new Bishop('black', 'c8');
        this.board[3][7] = new Queen('black', 'd8');
        this.board[4][7] = new King('black', 'e8');
        this.blackKing = this.board[4][7];
        this.board[5][7] = new Bishop('black', 'f8');
        this.board[6][7] = new Knight('black', 'g8');
        this.board[7][7] = new Rook('black', 'h8');
        for (var i = 0; i < 8; i++) {
            this.board[i][6] = new Pawn('black', String.fromCharCode(97 + i) + '7');
        }
    }

    whoseTurn() {
        return this.turn;
    }

    getColumn(square) {
        var column = square[0].charCodeAt(0) - 97;
        return column;
    }

    getRow(square) {
        var row = Number(square[1]) - 1;
        return row;
    }

    // returns the piece at the given square
    getPiece(square) {
        return this.board[this.getColumn(square)][this.getRow(square)];
    }

    isSquareEmpty(square) {
        if (this.getPiece(square) == null) {
            return true;
        }
        return false;
    }

    makeMove(fromSquare, toSquare) {
        // Validate the move and update the board
        if (this.validateMove(fromSquare, toSquare)) {
            this.board[this.getColumn(toSquare)][this.getRow(toSquare)] = this.board[this.getColumn(fromSquare)][this.getRow(fromSquare)];
            this.board[this.getColumn(fromSquare)][this.getRow(fromSquare)] = null;
            if (this.turn == 'white') {
                this.turn = 'black';
            }
            else {
                this.turn = 'white';
            }
            return true;
        }
    }

    validateMove(fromSquare, toSquare) {
        // Validate the move based on piece-specific rules
        const currPiece = this.getPiece(fromSquare);
        if (currPiece instanceof Knight) {
            if (currPiece.isValidMove(toSquare, this.board)) {
                currPiece.moved();
                currPiece.moveTo(toSquare);
                return true;
            }
        }
        //check if there is a piece in the square the pawn is moving to
        else if (currPiece instanceof Pawn) {
            if (currPiece.isValidMove(toSquare, this.board) && this.isSquareEmpty(toSquare)) {
                currPiece.moved();
                currPiece.moveTo(toSquare);
                return true;
            }
        }
        // check if there are any pieces between fromSquare and toSquare and if the move is valid
        else if (this.checkBlockingPieces(fromSquare, toSquare) && currPiece.isValidMove(toSquare, this.board)) {
            currPiece.moved();
            currPiece.moveTo(toSquare);
            return true;
        }
        return false;
    }

    checkBlockingPieces(fromSquare, toSquare) {
        // Return true if there are no pieces between fromSquare and toSquare
        // Return false if there are pieces between fromSquare and toSquare
        var squaresBw = this.#getSquaresBetween(fromSquare, toSquare);
        if (squaresBw !== null) {
            for (var i = 0; i < squaresBw.length; i++) {
                if (!this.isSquareEmpty(squaresBw[i])) {
                    return false;
                }
            }
        }
        return true;
    }


    #getSquaresBetween(fromSquare, toSquare) {
        // Return an array of squares between fromSquare and toSquare
        // Return an empty array if there are no squares between the two squares
        // Return null if the squares are not in the same row, column, or diagonal

        // if the squares are in the same row
        if (fromSquare[1] == toSquare[1]) {
            var squares = [];
            var start = fromSquare[0].charCodeAt(0);
            var end = toSquare[0].charCodeAt(0);
            var diff = Math.abs(start - end);
            for (var i = 1; i < diff; i++) {
                var square = String.fromCharCode(start + i) + fromSquare[1];
                squares.push(square);
            }
            return squares;
        }

        // if the squares are in the same column
        else if (fromSquare[0] == toSquare[0]) {
            var squares = [];
            var start = Number(fromSquare[1]);
            var end = Number(toSquare[1]);
            var diff = start - end;
            // if moving up the board
            if (diff < 0) {
                for (var i = 1; i < diff; i++) {
                    var square = fromSquare[0] + (start + i);
                    squares.push(square);
                }
            }
            // if moving down the board
            else {
                for (var i = 1; i < diff; i++) {
                    var square = fromSquare[0] + (start - i);
                    squares.push(square);
                }
            }
            return squares;
        }

        // if the squares are in the same diagonal
        else if (Math.abs(fromSquare[0].charCodeAt(0) - toSquare[0].charCodeAt(0)) == Math.abs(fromSquare[1] - toSquare[1])) {
            var squares = [];
            var startColumn = fromSquare[0].charCodeAt(0);
            var endColumn = toSquare[0].charCodeAt(0);
            var startRow = Number(fromSquare[1]);
            var diff = Math.abs(startColumn - endColumn);
            for (var i = 1; i < diff; i++) {
                var square = String.fromCharCode(startColumn + i) + (startRow + i);
                squares.push(square);
            }
            return squares;
        }    
        return null;
    }

    isInCheck(color) {
        // Check if a player of the given color is in check
    }

    isCheckmate(color) {
        // Check if a player of the given color is in checkmate
    }

    isStalemate(color) {
        // Check if a player of the given color is in stalemate
    }

    isDraw() {
        // Check for a draw based on various conditions (e.g., insufficient material)
    }

    // Methods to handle special moves (castling, en passant, pawn promotion, etc.)
    pawnPromotion() {
        // Method to handle pawn promotion
    }

    // Method to undo the last move
}





// global variables
let oldSquare = null;
let selectedPiece = null;
let board = new ChessBoard();
board.createBoard();
board.placePieces();

// Add event listeners to squares
const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    // if a square is clicked, call handleSquareClick
    square.addEventListener('click', () => {
        handleSquareClick(square);
        // Remove old square and add new square to selected
        if (oldSquare) {
            oldSquare.classList.remove('selected');
        }
        oldSquare = square;
        square.classList.add('selected');
    });
});

function handleSquareClick(square) {
    if (selectedPiece) {
      movePiece(square);
    } else {
      selectPiece(square);
    }
  }

function selectPiece(square) {
    const piece = square.querySelector('.piece');
    if (piece) {
      selectedPiece = piece;
      selectedPiece.classList.add('selected');
    }
}


function movePiece(square) {
    currSquare = oldSquare.getAttribute('data-square');
    newSquare = square.getAttribute('data-square');
    var color_clicked = board.getPiece(oldSquare.getAttribute('data-square')).getColor();
    if (board.whoseTurn() == color_clicked && board.makeMove(currSquare, newSquare)) {
        move(square);
    }
    selectedPiece = null;
}

// function movePiece(piece, square) {
//     // what piece is the selected piece
//     const piece_type = piece.id;


//     const currSquare = oldSquare.getAttribute('data-square');
//     const newSquare = square.getAttribute('data-square');

//     // piece currently at the square being moved to
//     const currPiece = square.querySelector('.piece');

//     // if the piece is a pawn
//     if (piece_type == 'pawn_white') {
//         const whitePawn = new Pawn('white', currSquare);
//         if (whitePawn.isValidMove(newSquare) && !currPiece) {
//             move(square);
//         }
//         else if (whitePawn.canCapture(newSquare) && currPiece) {
//             capture(square, currPiece);
//         }
//         else {
//             selectedPiece = null;
//         }
//         // promote if the pawn is on the promotion square
//         if (whitePawn.isPromotionSquare()) {
//             promote(newSquare);
//         }
//     }
//     else if (piece_type == 'pawn_black') {
//         const blackPawn = new Pawn('black', currSquare);
//         if (blackPawn.isValidMove(newSquare) && !currPiece) {
//             move(square);
//         }
//         else if (blackPawn.canCapture(newSquare) && currPiece) {
//             capture(square, currPiece);
//         }
//         else {
//             selectedPiece = null;
//         }
//         // promote if the pawn is on the promotion square
//         if (blackPawn.isPromotionSquare()) {
//             promote(newSquare);
//         }
//     }
    
// }

// called if a valid move is identified
function move(square) {
    square.appendChild(selectedPiece);
    selectedPiece.classList.remove('selected');
    selectedPiece = null;
}

function capture(square, currpiece) {
    square.removeChild(currpiece);
    move(square);
}

function promote(square) {
    // creates a new queen
    // remove pawn
    square.removeChild(selectedPiece);
    selectedPiece = null;
}