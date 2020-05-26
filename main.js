// Game Board as an array - module
const Gameboard = (() => {
    let squares = ['', '', '', '', '', '', '', '', ''];

    let player1Score = 0;
    let player2Score = 0;

    return {
        squares,
        player1Score,
        player2Score
    };
})();

// Player Object - factory
const Player = (name, mark) => {
    const playerName = name;
    const playerMark = mark;
    let score = 0;

    return {
        mark,
        score
    }
};

// DEBUG!!!!!!
const player1 = Player('Scott', 'X');
const player2 = Player('Shannon', 'O');

// Game Object - module
const PlayGame = (() => {
    let movesMade = 0;
    let winnerDeclared = false;

    for (movesMade = 0; movesMade < Gameboard.squares.length; movesMade++) {
        let mark;
        let position = prompt(`Player ${(movesMade % 2) + 1}, make a move`);
        if ((movesMade % 2) + 1 === 1) {
            mark = player1.mark;
        } else {
            mark = player2.mark;
        }
        Gameboard.squares.splice(position, 1, mark);
    }
})();

// Function to render Game Board to page
const RenderGame = (() => {
    let container = document.querySelector('.container');
    let board = document.createElement('div');
    board.classList.add('.board');
    board.style.display = 'grid';
    board.style.gridTemplateColumns = 'repeat(3, 1fr)';
    let gameboardSquares = Gameboard.squares;

    gameboardSquares.forEach(square => {
        let index = 0;
        let div = document.createElement('div');
        div.classList.add('square');
        div.setAttribute('data-index', index);
        index++;

        board.appendChild(div);
    });

    container.appendChild(board);



})();

// Function to allow players to add marks to a specific spot

// Logic to Check if a winner pattern has been created with matching marks, or if the game is a tie/stale-mate