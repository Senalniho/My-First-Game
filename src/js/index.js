class Piece {
  constructor(shape, colorIndex) {
    this.shape = shape; //This is a 2D array that represents the shape of the piece.
    this.colorIndex = colorIndex;
    this.x = 4; // These are the initial coordinates of the piece, set to 4 and 0, respectively.
    this.y = 0;
  }

  //The rotate method rotates the shape of the piece by 90 degrees clockwise.
  rotate() {
    let rotatedPiece = [];
    for (let i = 0; i < this.shape.length; i++) {
      rotatedPiece.push([]);
      for (let j = 0; j < this.shape[i].length; j++) {
        rotatedPiece[i].push(0);
      }
    }
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        rotatedPiece[i][j] = this.shape[j][i];
        // To swap the row and column indices to create a transposed matrix.
      }
    }
    for (let i = 0; i < rotatedPiece.length; i++) {
      rotatedPiece[i] = rotatedPiece[i].reverse();
      // To achieve a 90-degree clockwise rotation
    }
    return rotatedPiece;
  }
}

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.generateGrid();
  }

  // This method creates a 2D array with the specified number of rows
  //and columns, and initializes all elements to 0.
  generateGrid() {
    let grid = []; // 2D array to represent the gird
    for (let i = 0; i < this.rows; i++) {
      grid.push([]);
      for (let j = 0; j < this.cols; j++) {
        grid[i].push(0);
      }
    }
    return grid;
  }

  //This method checks for full rows in the grid and removes them
  checkGrid() {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      let allFilled = true;
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] == 0) {
          allFilled = false;
        }
      }
      if (allFilled) {
        count++;
        this.grid.splice(i, 1); // remove the row from the grid
        this.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // adds the new row
      }
    }
    return count;
  }

  collision(x, y, piece) {
    for (let i = 0; i < piece.shape.length; i++) {
      for (let j = 0; j < piece.shape[i].length; j++) {
        if (piece.shape[i][j] == 1) {
          // checks is the piece array is filled or not
          let p = x + j; // p & q calculate absolute coordinates of the cell in grid
          let q = y + i;
          if (p >= 0 && p < this.cols && q >= 0 && q < this.rows) {
            // check boundary conditions
            if (this.grid[q][p] > 0) {
              return true; // collision with boundary
            }
          } else {
            return true; //collision with existing piece
          }
        }
      }
    }
    return false; //// no collision
  }
}

// This manages the game state, handle user input, and render the game board.
class TetrisGame {
  constructor() {
    this.canvas = document.querySelector("#tetris");
    this.nextPieceCanvas = document.querySelector("#next-piece");
    this.scoreboard = document.querySelector("h2");
    this.ctx = this.canvas.getContext("2d");
    this.nextCtx = this.nextPieceCanvas.getContext("2d");
    this.ctx.scale(30, 30);
    this.nextCtx.scale(30, 30);

    this.shapes = [
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [
        [1, 1],
        [1, 1],
      ],
    ];

    this.colors = [
      "#fff",
      "#9b5fe0",
      "#16a4d8",
      "#60dbe8",
      "#8bd346",
      "#efdf48",
      "#f9a52c",
      "#d64e12",
    ];

    this.rows = 20;
    this.cols = 10;

    this.grid = new Grid(this.rows, this.cols);
    this.piece = null;
    this.nextPiece = this.randomPiece();
    this.score = 0;
    this.isPaused = true;
    this.gameInterval = null;

    document
      .getElementById("start-button")
      .addEventListener("click", () => this.startGame());
    document
      .getElementById("pause-button")
      .addEventListener("click", () => this.pauseGame());

    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
  }

  randomPiece() {
    let ran = Math.floor(Math.random() * 7);
    let piece = new Piece(this.shapes[ran], ran + 1);
    return piece;
  }

  startGame() {
    if (this.isPaused) {
      this.isPaused = false;
      this.gameInterval = setInterval(
        () => this.newGameState(),
        this.getGameSpeed()
      );
    }
  }

  pauseGame() {
    this.isPaused = true;
    clearInterval(this.gameInterval);
  }

  getGameSpeed() {
    if (this.score < 50) {
      return 500;
    } else if (this.score < 100) {
      return 400;
    } else if (this.score < 200) {
      return 300;
    } else {
      return 200;
    }
  }

  //Updates the game state by checking for full rows,
  // updating the score, and moving the current piece down
  newGameState() {
    if (!this.isPaused) {
      let count = this.grid.checkGrid();
      if (count == 1) {
        this.score += 10;
      } else if (count == 2) {
        this.score += 30;
      } else if (count == 3) {
        this.score += 50;
      } else if (count > 3) {
        this.score += 100;
      }
      this.scoreboard.innerHTML = "Score: " + this.score;

      clearInterval(this.gameInterval);
      this.gameInterval = setInterval(
        () => this.newGameState(),
        this.getGameSpeed()
      );

      if (!this.piece) {
        this.piece = this.nextPiece;
        this.nextPiece = this.randomPiece();
        this.renderNextPiece();
        this.renderPiece();
      }
      this.moveDown();
    }
  }

  // renders the piece by add the color
  renderPiece() {
    let piece = this.piece.shape;
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j] == 1) {
          this.ctx.fillStyle = this.colors[this.piece.colorIndex];
          this.ctx.fillRect(this.piece.x + j, this.piece.y + i, 1, 1);
        }
      }
    }
  }

  // renders next piece with the color
  renderNextPiece() {
    this.nextCtx.clearRect(
      0,
      0,
      this.nextPieceCanvas.width,
      this.nextPieceCanvas.height
    );
    let piece = this.nextPiece.shape;
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j] == 1) {
          this.nextCtx.fillStyle = this.colors[this.nextPiece.colorIndex];
          this.nextCtx.fillRect(j, i, 1, 1);
        }
      }
    }
  }

  moveDown() {
    if (!this.grid.collision(this.piece.x, this.piece.y + 1, this.piece)) {
      this.piece.y += 1;
    } else {
      let piece = this.piece.shape;
      for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
          if (piece[i][j] == 1) {
            let p = this.piece.x + j;
            let q = this.piece.y + i;
            this.grid.grid[q][p] = this.piece.colorIndex;
          }
        }
      }
      if (this.piece.y == 0) {
        alert("Game over");
        this.grid = new Grid(this.rows, this.cols);
        this.score = 0;
        clearInterval(this.gameInterval);
        this.gameInterval = setInterval(
          () => this.newGameState(),
          this.getGameSpeed()
        );
      }
      this.piece = null;
    }
    this.renderGame();
  }

  moveLeft() {
    if (!this.grid.collision(this.piece.x - 1, this.piece.y, this.piece))
      this.piece.x -= 1;
    this.renderGame();
  }

  moveRight() {
    if (!this.grid.collision(this.piece.x + 1, this.piece.y, this.piece))
      this.piece.x += 1;
    this.renderGame();
  }

  rotatePiece() {
    let rotatedPiece = new Piece(this.piece.rotate(), this.piece.colorIndex);
    if (!this.grid.collision(this.piece.x, this.piece.y, rotatedPiece)) {
      this.piece.shape = rotatedPiece.shape;
    }
    this.renderGame();
  }

  renderGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.grid.grid.length; i++) {
      for (let j = 0; j < this.grid.grid[i].length; j++) {
        this.ctx.fillStyle = this.colors[this.grid.grid[i][j]];
        this.ctx.fillRect(j, i, 1, 1);
      }
    }
    this.renderPiece();
  }

  handleKeyPress(e) {
    let key = e.key;
    e.preventDefault();
    if (key == "ArrowDown") {
      this.moveDown();
    } else if (key == "ArrowLeft") {
      this.moveLeft();
    } else if (key == "ArrowRight") {
      this.moveRight();
    } else if (key == "ArrowUp") {
      this.rotatePiece();
    }
  }
}

const game = new TetrisGame();
