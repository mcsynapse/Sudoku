document.getElementById('easy-btn').addEventListener('click', () => generateSudoku('easy'));
document.getElementById('moderate-btn').addEventListener('click', () => generateSudoku('moderate'));
document.getElementById('hard-btn').addEventListener('click', () => generateSudoku('hard'));

function generateSudoku(difficulty) {
  const grid = document.getElementById('sudoku-grid');
  grid.innerHTML = ''; // Clear the grid
  
  const sudoku = createEmptySudoku(); // Generate an empty board
  fillSudoku(sudoku); // Fill the board with numbers
  
  let cellsToRemove;
  if (difficulty === 'easy') {
    cellsToRemove = 30;
  } else if (difficulty === 'moderate') {
    cellsToRemove = 50;
  } else {
    cellsToRemove = 70;
  }
  createPuzzle(sudoku, cellsToRemove); // Remove numbers to create the puzzle

  sudoku.forEach(row => {
    row.forEach(cell => {
      const cellDiv = document.createElement('div');
      cellDiv.textContent = cell !== 0 ? cell : ''; // Display number or empty cell
      grid.appendChild(cellDiv);
    });
  });
}

// Function to create an empty 12x12 Sudoku grid
function createEmptySudoku() {
  return Array.from({ length: 12 }, () => Array(12).fill(0));
}

// Function to fill the Sudoku grid with a valid solution
function fillSudoku(board) {
  function isValid(board, row, col, num) {
    for (let i = 0; i < 12; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    const blockRow = Math.floor(row / 4) * 4;
    const blockCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[blockRow + i][blockCol + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  function solve(board) {
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 12; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 12; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve(board);
}

// Function to remove numbers from the Sudoku grid to create a puzzle
function createPuzzle(board, numHoles) {
  let holes = 0;
  while (holes < numHoles) {
    const row = Math.floor(Math.random() * 12);
    const col = Math.floor(Math.random() * 12);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      holes++;
    }
  }
}
