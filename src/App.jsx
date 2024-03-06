import { useState } from "react";

export default function Board() {
  const borderStyle = "5px solid #fff";

  const [boardStatus, setBoardStatus] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [squareEmpty, setSquareEmpty] = useState(8);
  var [restart, setRestart] = useState(false);
  var [bot, setBot] = useState(false);

  const result = checkWinner(boardStatus);

  var headingText = "";
  if (result) {
    restart = true;
    headingText = `WINNER: ${result}`;
  } else {
    headingText = `Player Turn: ${player ? "X" : "O"}`;
  }

  function handleClick(position) {
    const newBoardStatus = boardStatus.slice();

    if (newBoardStatus[position] || checkWinner(newBoardStatus)) {
      return;
    }

    if (squareEmpty === 0) {
      setRestart(true);
    } else {
      console.log(squareEmpty);
      setSquareEmpty(squareEmpty - 1);
    }

    const currentPlayer = player ? "X" : "O";
    newBoardStatus[position] = currentPlayer;

    setBoardStatus(newBoardStatus);
    setPlayer(!player);

    console.log("Player:", player);
    console.log("Click:", squareEmpty);
    if (bot && squareEmpty % 2 != 0) {
      botTurn(newBoardStatus);
    }
  }

  function botTurn(boardStatus) {
    var random = null;
    do {
      random = Math.floor(Math.random() * boardStatus.length);
    } while (boardStatus[random] != null);
    console.log(random);
    setTimeout(() => {
      handleClick(random);
    }, 2000);
  }

  function restartGame() {
    const boardRestart = Array(9).fill(null);
    setBoardStatus(boardRestart);
    setSquareEmpty(8);
    setRestart(false);
  }

  return (
    <>
      <div className="status-text">
        <h1 className="title">{headingText}</h1>
        <button onClick={() => setBot(true)}>Play with bot</button>
      </div>
      <div className="board">
        <div className="board-row">
          <Square
            value={boardStatus[0]}
            onClickEvent={() => handleClick(0)}
            border={{
              borderRight: borderStyle,
              borderBottom: borderStyle,
            }}
          />
          <Square
            value={boardStatus[1]}
            onClickEvent={() => handleClick(1)}
            border={{
              borderRight: borderStyle,
              borderBottom: borderStyle,
            }}
          />
          <Square
            value={boardStatus[2]}
            onClickEvent={() => handleClick(2)}
            border={{
              borderBottom: borderStyle,
            }}
          />
        </div>
        <div className="board-row">
          <Square
            value={boardStatus[3]}
            onClickEvent={() => handleClick(3)}
            border={{
              borderRight: borderStyle,
              borderBottom: borderStyle,
            }}
          />
          <Square
            value={boardStatus[4]}
            onClickEvent={() => handleClick(4)}
            border={{
              borderRight: borderStyle,
              borderBottom: borderStyle,
            }}
          />
          <Square
            value={boardStatus[5]}
            onClickEvent={() => handleClick(5)}
            border={{
              borderBottom: borderStyle,
            }}
          />
        </div>
        <div className="board-row">
          <Square
            value={boardStatus[6]}
            onClickEvent={() => handleClick(6)}
            border={{
              borderRight: borderStyle,
            }}
          />
          <Square
            value={boardStatus[7]}
            onClickEvent={() => handleClick(7)}
            border={{
              borderRight: borderStyle,
            }}
          />
          <Square value={boardStatus[8]} onClickEvent={() => handleClick(8)} />
        </div>
      </div>
      {restart && (
        <button className="restart-game" onClick={() => restartGame()}>
          Restart Game
        </button>
      )}
    </>
  );
}

// Components
function Square({ value, onClickEvent, border }) {
  return (
    <button className="square" onClick={onClickEvent} style={border}>
      {value}
    </button>
  );
}

// Functions
function checkWinner(boardStatus) {
  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (var i = 0; i < winCombination.length; i++) {
    const [a, b, c] = winCombination[i];
    if (
      boardStatus[a] &&
      boardStatus[a] === boardStatus[b] &&
      boardStatus[b] === boardStatus[c]
    ) {
      return boardStatus[a];
    }
  }
  return null;
}
