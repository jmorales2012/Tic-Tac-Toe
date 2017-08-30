var cpuMove;
var symbols = ["X", "O"]/*[prompt("Human Symbol: "), prompt("CPU Symbol: ")]*/;
var body = document.querySelector("body");
var squares = document.querySelectorAll("td");
var playerOneScoreDisplay = document.querySelector("#playerOneScore");
var playerTwoScoreDisplay = document.querySelector("#playerTwoScore");

var playerOneScore = Number(playerOneScoreDisplay.innerText);
var playerTwoScore = Number(playerTwoScoreDisplay.innerText);

// reset();


// add event listener to squares
squares.forEach(function(square) {
  square.addEventListener("click", function() {
    if (!humanMove(square, symbols[0]))
      computerMove(symbols[1]);
    if (checkTie())
      endGame();
  });
});



function checkWin(symbol, board) {
  // set winning rows
  win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  var winner = false;
  for (var i = 0; i < win.length; i++) {
    for (var j = 0; j < win[i].length; j++) {
      // match the win row/index to square, check match
      if (board[win[i][j]] !== symbol) {
        winner = false;
        break;
      }
      winner = true;
    }
    // we made it to end of row, found a winner
    if (winner) break;
  }

  return winner;
}


function checkTie() {
  var tie = false;
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].innerText === "") {
      // not all spaces have been played yet
      tie = false;
      break;
    }
    tie = true;
  }
  return tie;
}


function endGame(winner) {
  if (winner === "playerOne")
    playerOneScoreDisplay.innerText = ++playerOneScore;
  if (winner === "playerTwo")
    playerTwoScoreDisplay.innerText = ++playerTwoScore;
  body.addEventListener("click", remove, false);
}


function remove() {
  // remove event listener added by endGame()
  reset();
  body.removeEventListener("click", remove, false);
}


function reset() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerText = "";
  }
  var symbols = ["X", "O"]/*[prompt("Human Symbol: "), prompt("CPU Symbol: ")]*/;
}


function humanMove(square, symbol) {
  var board = [];
  if (!square.innerText)
    square.innerText = symbol;

  // make a copy of playing board
  for (var i = 0; i < squares.length; i++) {
    board.push(squares[i].innerText);
  }

  // test if human won using board copy
  if (checkWin(symbol, board)) {
    endGame("playerOne");
    return true;
  }
}


function computerMove(symbol) {
  var win;
  var index;
  var random;

  // make a copy of the game board to test moves for possible win
  var board = [];
  for (var i = 0; i < squares.length; i++) {
    board.push(squares[i].innerText);
  }

  var corners = [];
  // corners are 0, 2, 6, 8 -- skip 4
  for (i = 0; i < board.length; i += 2) {
    if (board[i] === "" && i !== 4)
      corners.push(i);
  }

  var sides = [];
  // sides are 1, 3, 5, 7
  for (i = 1; i < board.length; i += 2) {
    if (board[i] === "")
      sides.push(i);
  }

  // if computer can win on next move, take it
  if (!index) {
    for (var i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = symbol;
        if (checkWin(symbol, board)) {
          index = i;
        }
        board[i] = "";
      }
    }
  }

  // if human can win on next move, take it
  if (!index) {
    for (var i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = symbols[0];
        if (checkWin(symbols[0], board)) {
          index = i;
        }
        board[i] = "";
      }
    }
  }

  // take a random empty corner space first
  if (corners.length > 0 && !index) {
    index = corners[Math.floor(Math.random() * corners.length)];
  }

  // take an empty center next
  if (board[4] === "" && !index) {
    index = 4;
  }

  // take a random empty side space last
  if (sides.length > 0 && !index) {
    index = sides[Math.floor(Math.random() * sides.length)];
  }

  if (index) {
    squares[index].innerText = symbol;
    board[index] = symbol;
  }

  if (checkWin(symbol, board)) {
    endGame("playerTwo");
    return true;
  }
}