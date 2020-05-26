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
  let movesMade = 0;
  let winnerDeclared = false;
  let mark = player1.mark;
  for (movesMade = 0; movesMade < Gameboard.squares.length; movesMade++) {
    const turnPrompt = document.querySelector(".turn");

    let positionSelected;

    //let position = prompt(`Player ${(movesMade % 2) + 1}, make a move`);
    if ((movesMade % 2) + 1 === 1) {
      mark = player1.mark;
      turnPrompt.textContent = "Player 1's turn";
    } else {
      mark = player2.mark;
      turnPrompt.textContent = "Player 2's turn";
    }
    Gameboard.squares.splice(positionSelected, 1, mark);
  }
  let squares = Array.from(RenderGame.board.children);
  console.log(squares[0].getAttribute("data-index"));
  squares.forEach((square) => {
    square.addEventListener("click", changeStatus);

    function changeStatus(e) {
      let index = e.target.getAttribute("data-index");
      e.target.textContent = mark;
      Gameboard.squares[index] = mark;
      movesMade++;
      console.log(movesMade);
    }
  });
})();

// Logic to Check if a winner pattern has been created with matching marks, or if the game is a tie/stale-mate
