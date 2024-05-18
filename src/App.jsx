import { useState } from "react";

const borderStyle = "5px solid #fff";
var headingText = "Tic Tac Toe";
var turn = false;
var botPlayer = false;
var turnLeft = 9;
var winner = null;

export default function Board() {
  const [boardStatus, setBoardStatus] = useState(Array(9).fill(null));

  var player = turn ? "X" : "O";

  function handleClick(position) {
    var newBoardStatus = boardStatus.slice();

    winner = checkWinner(newBoardStatus);

    // Check if game is end
    if (newBoardStatus[position] || winner || turnLeft == 0) {
      return;
    }

    // Turn Left -1
    turnLeft--;

    // Change next turn
    turn = !turn;

    // Update board with player move
    newBoardStatus[position] = player;

    
    // Check Turn Left
    turnLeft == 0 && (headingText = `Game End`);

    // Check Winner
    winner = checkWinner(newBoardStatus);
    winner && (headingText = `Winner: ${winner}`);

    // Bot is playing ?
    botPlayer && turnLeft != 0 && !winner
      ? (newBoardStatus = botMove(newBoardStatus))
      : null;
    
    // Check Turn Left
    turnLeft == 0 && (headingText = `Game End`);

    // Check Winner
    winner = checkWinner(newBoardStatus);
    winner && (headingText = `Winner: ${winner}`);

    // Update UI
    setBoardStatus(newBoardStatus);
  }

  return (
    <>
      <div className="status-text">
        <h1 className="title">{headingText}</h1>
        <div className="button-container">
          <button className="btn" onClick={() => (botPlayer = true)}>
            Play with bot
          </button>
          <button className="btn" onClick={() => location.reload()}>
            Restart
          </button>
        </div>
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

function botMove(boardStatus) {
  // Find free cell and return it
  var cell = null;
  do {
    cell = Math.floor(Math.random() * boardStatus.length);
  } while (boardStatus[cell] != null);
  boardStatus[cell] = turn ? "X" : "O";
  turn = !turn;
  turnLeft--;
  return boardStatus;
}
