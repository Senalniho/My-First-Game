# Tetris Game

This project is a fully functional Tetris game implemented in JavaScript with Object-Oriented Programming (OOP) principles. The game features essential Tetris mechanics including piece rotation, line clearing, and progressively increasing speed. Additionally, the game includes a user interface with a start/pause button and a display for the next piece.

# Table of Contents

- Features
- Demo
- Usage
- Classes and Methods

## Features

- Basic Tetris mechanics: move, rotate, and drop pieces.
- Start and pause functionality.
- Score tracking.
- Display of the next piece.
- Increasing game speed as the score increases.
- Clear and modular code using OOP principles.

## Demo

https://senalniho.github.io/My-First-Game/

## Usage

**Start the game:** Click the "Start" button to begin playing.

**Pause the game:** Click the "Pause" button to pause the game.

**Control pieces:** Use the arrow keys to move and rotate the pieces:

- **ArrowLeft:** Move piece left
- **ArrowRight:** Move piece right
- **ArrowDown:** Move piece down
- **ArrowUp:** Rotate piece

## Classes and Methods

### Piece Class

Represents a Tetris piece.

- **Constructor:** Initializes the piece with its shape and color.
- **rotate ():** Rotates the piece 90 degrees clockwise.

### Grid Class

Manages the game grid and handles grid operations.

**Constructor:** Initializes the grid with specified rows and columns.

**generateGrid():** Generates an empty grid.

**checkGrid():** Checks and clears full lines, returning the count of cleared lines.

**collision(x, y, piece):** Checks for collisions when moving or rotating a piece.

### TetrisGame Class

Manages the overall game state.

**Constructor:** Initializes the game, sets up the canvas, and event listeners.

**randomPiece():** Generates a random piece.

**startGame():** Starts the game.

**pauseGame():** Pauses the game.

**getGameSpeed():** Returns the current game speed based on the score.

**newGameState():** Updates the game state.

**renderPiece():** Renders the current piece on the canvas.

**renderNextPiece():** Renders the next piece on the secondary canvas.

**moveDown():** Moves the current piece down.

**moveLeft():** Moves the current piece left.

**moveRight():** Moves the current piece right.

**rotatePiece():** Rotates the current piece.

**renderGame():** Renders the game grid and current piece.

**handleKeyPress(e):** Handles keyboard inputs for game
controls.
