const BOARD_SIZE = 3 * 3;

const gameBoard = (function () {
  const board = Array(9);
  let filledCount = 0;
  let winner;
  let tie = false;

  function printBoard() {
    console.log(board.slice(0, 3));
    console.log(board.slice(3, 6));
    console.log(board.slice(6, 9));
  }

  function markBoard({ name, mark }, pos) {
    if (pos < 0 || 9 < pos) {
      return false;
    }

    if (board[pos] !== undefined) {
      return false;
    }

    board[pos] = mark;
    filledCount++;

    if (checkWin(mark)) {
      winner = name;
    } else {
      checkTie();
    }

    return true;
  }

  function checkWin(mark) {
    if (board.slice(0, 3).filter((a) => a === mark).length === 3) {
      return true;
    }

    if (board.slice(3, 6).filter((a) => a === mark).length === 3) {
      return true;
    }

    if (board.slice(6, 9).filter((a) => a === mark).length === 3) {
      return true;
    }

    for (let i = 0; i < 3; i++) {
      if (mark === board[i] && mark === board[i + 3] && mark === board[i + 6]) {
        return true;
      }
    }

    let i = 0;
    if (board[i] === mark && board[i + 4] === mark && board[i + 8] === mark) {
      return true;
    }

    i = 2;
    if (board[i] === mark && board[i + 2] === mark && board[i + 2] === mark) {
      return true;
    }

    return false;
  }

  function checkTie() {
    tie = filledCount === BOARD_SIZE;
  }

  const isWin = () => winner;
  const isTie = () => tie;

  return { printBoard, markBoard, isWin, isTie };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const gameController = (function () {
  const player1 = createPlayer("player 1", 0);
  const player2 = createPlayer("player 2", 1);

  let currentPlayer = player1;
  const getCurrentPlayer = () => currentPlayer;

  const showWin = () => {};
  const showTie = () => {};

  const nextPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  return { getCurrentPlayer, nextPlayer };
})();

document.querySelectorAll("#board > button").forEach((button) =>
  button.addEventListener("click", (e) => {
    const isValid = gameBoard.markBoard(
      gameController.getCurrentPlayer(),
      Number(e.target.id) - 1,
    );

    if (!isValid) {
      return;
    }

    e.target.innerText =
      gameController.getCurrentPlayer().mark === 0 ? "X" : "O";
    gameController.nextPlayer();
  }),
);
