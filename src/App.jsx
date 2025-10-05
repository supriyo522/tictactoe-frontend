import React, { useState } from "react";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

export default function App() {
  // board is an array of 9: '', 'X' or 'O'
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });

  const currentPlayer = xIsNext ? "X" : "O";

  function calculateWinner(squares) {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (board[index] || winnerInfo.winner) return; // ignore if already set or game over

    const next = board.slice();
    next[index] = currentPlayer;
    setBoard(next);

    const win = calculateWinner(next);
    if (win) {
      setWinnerInfo({ winner: win.winner, line: win.line });
      return;
    }

    // check draw
    if (next.every(Boolean)) {
      setWinnerInfo({ winner: "draw", line: [] });
      return;
    }

    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setXIsNext(true);
    setWinnerInfo({ winner: null, line: [] });
  };

  const renderCell = (i) => {
    const isWinCell = winnerInfo.line.includes(i);
    return (
      <button
        key={i}
        className={`cell ${isWinCell ? "win" : ""}`}
        onClick={() => handleClick(i)}
        aria-label={`cell-${i}`}
      >
        {board[i]}
      </button>
    );
  };

  let statusText = `Player ${currentPlayer}'s turn`;
  if (winnerInfo.winner === "draw") {
    statusText = "It's a draw!";
  } else if (winnerInfo.winner) {
    statusText = `Player ${winnerInfo.winner} wins!`;
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>

      <div className="card">
        <div className="status" data-testid="status">
          {statusText}
        </div>

        <div className="board" role="grid" aria-label="tic-tac-toe-board">
          {Array.from({ length: 9 }).map((_, i) => renderCell(i))}
        </div>

        <div className="controls">
          <button onClick={reset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
