import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      setScore((prev) => ({ ...prev, [win]: prev[win] + 1 }));
    } else {
      setIsXNext(!isXNext);
    }
  };

  const handleRestartRound = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  const handleResetAll = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setScore({ X: 0, O: 0 });
    setIsXNext(true);
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>

      <div className="scoreboard">
        <p>Player X: {score.X}</p>
        <p>Player O: {score.O}</p>
      </div>

      {winner && <h2 className="winner">Player {winner} Wins!</h2>}

      <div className="board">
        {board.map((value, index) => (
          <button key={index} className="cell" onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>

      <div className="buttons">
        <button onClick={handleRestartRound}>Restart Round</button>
        <button onClick={handleResetAll}>Reset All</button>
      </div>
    </div>
  );
};

export default App;
