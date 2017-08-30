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