document.addEventListener("DOMContentLoaded", () => {
  createTetrisBoard();
  initTetrominoGame();
  createMiniBoard();
});

function createTetrisBoard() {
  const board = document.createElement("div");
  board.className = "board";

  for (let i = 0; i < 200; i++) {
    const square = document.createElement("div");
    square.className = "square";
    board.appendChild(square);
  }

  document.body.appendChild(board);

  const squares = document.querySelectorAll(".square");
  let i = 0;
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      squares[i].dataset.x = x;
      squares[i].dataset.y = y;
      i++;
    }
  }
}

const width = 10;

const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;
let squares;
let currentTetromino;
let timerId;

function initTetrominoGame() {
  squares = document.querySelectorAll(".square");
  currentTetromino = getRandomTetromino();
  drawTetromino();
  // timerId = setInterval(moveDown, 1000);
}

function getRandomTetromino() {
  return theTetrominoes[Math.floor(Math.random() * theTetrominoes.length)];
}

function drawTetromino() {
  currentTetromino[currentRotation].forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

function undrawTetromino() {
  currentTetromino[currentRotation].forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

function moveDown() {
  undrawTetromino();
  currentPosition += width;
  drawTetromino();
  freeze();
}

function freeze() {
  if (
    currentTetromino[currentRotation].some(
      (index) =>
        squares[currentPosition + index + width] === undefined ||
        squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    currentTetromino[currentRotation].forEach((index) => {
      squares[currentPosition + index].classList.add("taken", "fixed");
      squares[currentPosition + index].classList.remove("tetromino");
    });
    currentTetromino = getRandomTetromino();
    currentPosition = 4;
    currentRotation = 0;
    drawTetromino();
    if (
      currentTetromino[currentRotation].some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      clearInterval(timerId);
      alert("Game Over");
    }
  }
}

document.addEventListener("keyup", control);

function moveLeft() {
  const isAtLeftEdge = currentTetromino[currentRotation].some(
    (index) => (currentPosition + index) % width === 0
  );

  if (!isAtLeftEdge) {
    undrawTetromino();
    currentPosition -= 1;
    if (
      currentTetromino[currentRotation].some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    drawTetromino();
  }
}

function moveRight() {
  const isAtRightEdge = currentTetromino[currentRotation].some(
    (index) => (currentPosition + index) % width === width - 1
  );

  if (!isAtRightEdge) {
    undrawTetromino();
    currentPosition += 1;
    if (
      currentTetromino[currentRotation].some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    drawTetromino();
  }
}

function rotate() {
  undrawTetromino();
  currentRotation = (currentRotation + 1) % currentTetromino.length;
  drawTetromino();
}

function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}

function createMiniBoard() {
  const miniboard = document.createElement("div");
  miniboard.className = "miniboard";

  for (let i = 0; i < 25; i++) {
    const miniSquare = document.createElement("div");
    miniSquare.className = "miniSquare";
    miniboard.appendChild(miniSquare);
  }

  document.body.appendChild(miniboard);

  const miniSquares = document.querySelectorAll(".miniSquare");
  let i = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      miniSquares[i].dataset.x = x;
      miniSquares[i].dataset.y = y;
      i++;
    }
  }
  initTetrominoGame();
}

const startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    initTetrominoGame();
  }
});
