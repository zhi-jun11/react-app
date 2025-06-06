import { useState } from "react";
import "./tictactoe.css";

function calculateWinner(squares) {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = squares.every(Boolean) && !winner;

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = "勝利者: " + winner;
  } else if (isDraw) {
    status = "平手";
  } else {
    status = "下一步: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h2>Tic Tac Toe</h2>
      <div className="game">
        <div className="game-board">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 40px)",
              gap: 4,
            }}
          >
            {squares.map((value, i) => (
              <button
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  fontSize: 24,
                  cursor: value || winner ? "default" : "pointer",
                }}
                onClick={() => handleClick(i)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="game-info">
          <h4>遊戲歷程</h4>
          <div style={{ marginBottom: 8 }}>{status}</div>
          <button style={{ marginTop: 12 }} onClick={handleReset}>
            重新開始
          </button>
        </div>
      </div>
    </>
  );
}

export default TicTacToe;
