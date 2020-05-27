// Game Board as an array - module
const Gameboard = (() => {
  let squares = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let player1Score = 0;
  let player2Score = 0;
  let movesMade = 0;

  return {
    squares,
    player1Score,
    player2Score,
    movesMade,
  };
})();

// Player Object - factory
const Player = (name, mark) => {
  const playerName = name;
  const playerMark = mark;
  let score = 0;

  return {
    name,
    mark,
    score,
  };
};

// DEBUG!!!!!!
const player1 = Player("Scott", "X");
const player2 = Player("Shannon", "O");

// Function to render Game Board to page
const RenderGame = (() => {
  let indexX = 0;
  let indexY = 0;

  let container = document.querySelector(".container");
  let board = document.createElement("div");
  board.classList.add("board");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, 1fr)";
  let gameboardSquares = Gameboard.squares;

  let squares = board.querySelectorAll("div");
  for (let y = 0; y < gameboardSquares[0].length; y++) {
    gameboardSquares[y].forEach((square) => {
      let div = document.createElement("div");
      div.classList.add("square");

      div.setAttribute("data-index-y", indexY);
      div.setAttribute("data-index-x", indexX);
      indexX++;
      board.appendChild(div);
    });
    indexY++;
    indexX = 0;
  }

  container.appendChild(board);
  return { board, gameboardSquares, squares };
})();

// Game Object - module
const PlayGame = (() => {
  let winnerDeclared = false;
  let mark = player1.mark;

  let squares = Array.from(RenderGame.board.children);
  squares.forEach((square) => {
    square.addEventListener("click", changeStatus);

    function changeStatus(e) {
      const turnDiv = document.querySelector(".turn");

      let indexX = e.target.getAttribute("data-index-x");
      let indexY = e.target.getAttribute("data-index-y");

      if (Gameboard.movesMade % 2 === 0 || Gameboard.movesMade === 0) {
        mark = player1.mark;
        turnDiv.textContent = "Player 2's turn";
        Gameboard.movesMade++;
      } else {
        mark = player2.mark;
        turnDiv.textContent = "Player 1's turn";
        Gameboard.movesMade++;
      }
      e.target.textContent = mark;
      console.log(e.target);
      e.target.classList.add("click-disabled");
      Gameboard.squares[indexY][indexX] = mark;

      // Check here for a win or a draw
      if (Gameboard.movesMade === 9) {
        turnDiv.textContent = "It's a draw!";
        reset();
        Gameboard.movesMade = 0;
      } else {
        checkForWinningCombo(Gameboard);
      }
    }
  });
})();

// Logic to Check if a winner pattern has been created with matching marks, or if the game is a tie/stale-mate
function checkForWinningCombo(board) {
  const squares = Gameboard.squares;

  // Loop through columns to see if winning pattern exists
  for (let y = 0; y < Gameboard.squares.length; y++) {
    if (
      squares[y][0] === squares[y][1] &&
      squares[y][0] === squares[y][2] &&
      squares[y][0] !== ""
    ) {
      return determineWinner(squares[y][0]);
    }
  }

  // Loop through columns to see if winning pattern exists
  for (let x = 0; x < Gameboard.squares.length; x++) {
    if (
      squares[0][x] === squares[1][x] &&
      squares[0][x] === squares[2][x] &&
      squares[0][x] !== ""
    ) {
      return determineWinner(squares[0][x]);
    }
  }

  // Check to see if a winning diagonal pattern exists
  if (
    (squares[0][0] === squares[1][1] &&
      squares[0][0] === squares[2][2] &&
      squares[1][1] !== "") ||
    (squares[0][2] === squares[1][1] &&
      squares[0][2] === squares[2][0] &&
      squares[1][1] !== "")
  ) {
    return determineWinner(squares[1][1]);
  }
  console.log(squares);
}

function determineWinner(square) {
  const turnDiv = document.querySelector(".turn");

  if (square === player1.mark) {
    turnDiv.textContent = `${player1.name} wins!!!`;

    setTimeout(function () {
      reset();
      turnDiv.textContent = "Player 1's Turn";
    }, 1500);
    return Gameboard.player1Score++;
  }

  if (square === player2.mark) {
    turnDiv.textContent = `${player2.name} wins!!!`;

    setTimeout(function () {
      reset();
      turnDiv.textContent = "Player 1's Turn";
    }, 1000);
    return Gameboard.player2Score++;
  }
}

function reset() {
  let squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("click-disabled");
    document.querySelector("#p1-score").textContent = Gameboard.player1Score;
    document.querySelector("#p2-score").textContent = Gameboard.player2Score;

    Gameboard.movesMade = 0;
    Gameboard.squares = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  });
}

// Reset Button
const resetButton = document.querySelector(".btn-reset");

resetButton.addEventListener("click", () => {
  Gameboard.player1Score = 0;
  Gameboard.player2Score = 0;
  document.querySelector("#p1-score").textContent = Gameboard.player1Score;
  document.querySelector("#p2-score").textContent = Gameboard.player2Score;
  reset();
});
