const grid = document.getElementById("sudoku-grid");

// Create 81 input cells
for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = 9;
  input.classList.add("cell");
  grid.appendChild(input);
}

function getGridValues() {
  const cells = document.querySelectorAll(".cell");
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      const val = cells[i * 9 + j].value;
      row.push(val ? parseInt(val) : 0);
    }
    board.push(row);
  }
  return board;
}

function setGridValues(board) {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i * 9 + j].value = board[i][j] !== 0 ? board[i][j] : "";
    }
  }
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  const cells = document.querySelectorAll(".cell");
  let board = getGridValues();

  // Track which cells are originally filled by user
  let userFilled = [];
  for (let i = 0; i < 81; i++) {
    userFilled.push(cells[i].value ? true : false);
  }

  if (solve(board)) {
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      cells[i].value = board[row][col];

      if (!userFilled[i]) {
        cells[i].classList.add("generated");
      } else {
        cells[i].classList.remove("generated");
      }
    }
    alert("Sudoku Solved!");
  } else {
    alert("No solution exists!");
  }
}


function clearGrid() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.value = "";
    cell.classList.remove("generated");
  });
}
