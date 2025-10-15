const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tic Tac Toe</title>
  <style>
    body {
      background: #f7f9fc;
      color: #333;
      font-family: "Segoe UI", Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    h1 {
      color: #0077cc;
      margin-bottom: 20px;
    }

    #board {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(3, 100px);
      gap: 8px;
    }

    .cell {
      background: #ffffff;
      border: 2px solid #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      cursor: pointer;
      border-radius: 10px;
      transition: background 0.2s;
    }

    .cell:hover {
      background: #e8f0fe;
    }

    #reset {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 1rem;
      background-color: #0077cc;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    #reset:hover {
      background-color: #005fa3;
    }

    #status {
      margin-top: 15px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Tic Tac Toe</h1>
  <div id="board"></div>
  <button id="reset">Reset</button>
  <div id="status"></div>

  <script>
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const reset = document.getElementById("reset");
    let currentPlayer = "X";
    let cells = Array(9).fill("");

    function renderBoard() {
      board.innerHTML = "";
      cells.forEach((val, i) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = val;
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
      });
    }

    function makeMove(i) {
      if (cells[i] || checkWinner()) return;
      cells[i] = currentPlayer;
      if (checkWinner()) {
        status.textContent = currentPlayer + " wins!";
      } else if (cells.every(c => c)) {
        status.textContent = "Draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = "Turn: " + currentPlayer;
      }
      renderBoard();
    }

    function checkWinner() {
      const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      return combos.some(([a,b,c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
    }

    reset.addEventListener("click", () => {
      cells = Array(9).fill("");
      currentPlayer = "X";
      status.textContent = "Turn: X";
      renderBoard();
    });

    renderBoard();
    status.textContent = "Turn: X";
  </script>
</body>
</html>`);
});

app.listen(port, () => console.log(`Tic Tac Toe running at http://localhost:${port}`));
