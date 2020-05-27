let movesMade = 0;

// Game Board as an array - module
const Gameboard = (() => {
  let squares = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let player1Score = 0;
  let player2Score = 0;

  return {
    squares,
    player1Score,
    player2Score,
  };
})();

// Player Object - factory
const Player = (name, mark) => {
  const playerName = name;
  const playerMark = mark;
  let score = 0;

  return {
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
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let mark = player1.mark;

  let squares = Array.from(RenderGame.board.children);
  squares.forEach((square) => {
    square.addEventListener("mouseup", changeStatus);

    function changeStatus(e) {
      const turnPrompt = document.querySelector(".turn");

      let indexX = e.target.getAttribute("data-index-x");
      let indexY = e.target.getAttribute("data-index-y");

      if (movesMade % 2 === 0) {
        mark = player1.mark;
        turnPrompt.textContent = "Player 1's turn";
        movesMade++;
      } else {
        mark = player2.mark;
        turnPrompt.textContent = "Player 2's turn";
        movesMade++;
      }
      e.target.textContent = mark;
      Gameboard.squares[indexY][indexX] = mark;
      console.log(movesMade);
      // Check here for a win or a draw
      if (movesMade === 9) {
        alert("It's a draw");
      }
    }
  });

  return {
    winningCombos,
  };
})();

// Logic to Check if a winner pattern has been created with matching marks, or if the game is a tie/stale-mate
function checkForWinningCombo(board, x, y) {
  const squares = Gameboard.squares;
  const winningCombos = PlayGame.winningCombos;

  // Loop through columns to see if winning pattern exists
  for (let y = 0; y < Gameboard.squares.length; y++) {
    if (
      squares[y][0] === squares[y][1] &&
      squares[y][0] === squares[y][2] &&
      squares[y][0] !== ""
    ) {
      return "Winner! CHICKEN DINNER!";
    }
  }

  // Loop through columns to see if winning pattern exists
  for (let x = 0; x < Gameboard.squares.length; x++) {
    if (
      squares[0][x] === squares[1][x] &&
      squares[0][x] === squares[2][x] &&
      squares[0][x] !== ""
    ) {
      return "Winner! CHICKEN DINNER!";
    }
  }

  // Check to see if a winning diagonal pattern exists
  if (
    (squares[0][0] === squares[1][1] &&
      squares[0][0] === squares[2][2] &&
      squares[0][0] !== "") ||
    (squares[0][2] === squares[1][1] &&
      squares[0][2] === squares[2][0] &&
      squares[0][0] !== "")
  ) {
    return "Winner! CHICKEN DINNER!";
  }
  console.log(squares);
  console.log(winningCombos);
}
