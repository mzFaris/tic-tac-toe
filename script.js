const gameBoard = (function () {
  const board = Array(9);
  let winner;

  function printBoard() {
    console.log(board.slice(0, 3));
    console.log(board.slice(3, 6));
    console.log(board.slice(6, 9));
  }

  function markBoard({ name, mark }, pos) {
    if (pos < 0 || 9 < pos) {
      return;
    }

    if (board[pos] !== undefined) {
      return;
    }

    board[pos] = mark;
    printBoard();

    if (checkWin(mark)) {
      winner = name;
    }
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

  const isWin = () => winner;

  return { printBoard, markBoard, isWin };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const player1 = createPlayer("player 1", 0);
const player2 = createPlayer("player 2", 1);
