import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState("X");

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
    } else if (newBoard.every(Boolean)) {
      setWinner("Draw");
      setScore((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
    } else {
      setIsXNext(!isXNext);
      setTurn(isXNext ? "O" : "X");
    }
  };

  const handleRestartRound = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
    setTurn("X");
  };

  const handleResetAll = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
    setTurn("X");
    setScore({ X: 0, O: 0, Draws: 0 });
  };

  return (
    <div className="app">
      <h1 className="title">Tic-Tac-Toe</h1>

      <div className="scoreboard">
        <p className="x-score">
          X: <span>{score.X}</span>
        </p>
        <p className="draw-score">
          Draws: <span>{score.Draws}</span>
        </p>
        <p className="o-score">
          O: <span>{score.O}</span>
        </p>
      </div>

      {!winner && <p className="turn">Turn: {turn}</p>}
      {winner && winner !== "Draw" && <p className="winner">Winner: {winner}</p>}
      {winner === "Draw" && <p className="winner">It's a Draw!</p>}

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className={`cell ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="buttons">
        <button className="restart-btn" onClick={handleRestartRound}>
          Restart Round
        </button>
        <button className="reset-btn" onClick={handleResetAll}>
          Reset All
        </button>
      </div>
    </div>
  );
};

export default App;
