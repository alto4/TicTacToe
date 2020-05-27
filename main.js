let movesMade = 0;

// Game Board as an array - module
const Gameboard = (() => {
  let squares = ["", "", "", "", "", "", "", "", ""];

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
  let index = 0;

  let container = document.querySelector(".container");
  let board = document.createElement("div");
  board.classList.add(".board");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, 1fr)";
  let gameboardSquares = Gameboard.squares;

  let squares = board.querySelectorAll("div");

  gameboardSquares.forEach((square) => {
    let div = document.createElement("div");
    div.classList.add("square");
    div.setAttribute("data-index", index);
    index++;

    board.appendChild(div);
  });

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
  console.log(squares[0].getAttribute("data-index"));
  squares.forEach((square) => {
    square.addEventListener("mouseup", changeStatus);

    function changeStatus(e) {
      const turnPrompt = document.querySelector(".turn");
      let index = e.target.getAttribute("data-index");
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
      Gameboard.squares[index] = mark;
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
function checkForWinningCombo(squares) {
  console.log(Gameboard.squares);
  console.log(PlayGame.winningCombos);

  const winningArray = [];
  PlayGame.winningCombos.forEach((combo) => {
    if (Gameboard.squares[combo]) {
      winningArray.push(Gameboard.squares[combo]);
    }
  });

  PlayGame.winningCombos.forEach((combo) => {
    if (winningArray === PlayGame.winningCombos) {
      return "we have a winner";
    }
    return "Loser!";
  });
  console.log(winningArray);
}
