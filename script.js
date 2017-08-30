var squares = document.querySelectorAll("td");
var playerOneTurn = true;


// add event listener to squares
squares.forEach(function(square) {
  square.addEventListener("click", function() {
    if (playerOneTurn) {
      square.innerText = "X";
      playerOneTurn = !playerOneTurn;
    } else {
      square.innerText = "O";
      playerOneTurn = !playerOneTurn;
    }
  });
});



function checkWin(symbol) {
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
  // loop through winning rows/indices
  for (var i = 0; i < win.length; i++) {
    for (var j = 0; j < win[i].length; j++) {
      // match the row/index to square, check match
      if (squares[win[i][j]].innerText !== symbol) {
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