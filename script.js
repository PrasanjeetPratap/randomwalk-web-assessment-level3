document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const currentPlayerDisplay = document.getElementById('currentPlayer');
    const gameStatusDisplay = document.getElementById('gameStatus');
    const drawCountDisplay = document.getElementById('drawCount');
    const playerXScore = document.getElementById('playerXScore');
    const playerOScore = document.getElementById('playerOScore');
    const newGameBtn = document.getElementById('newGameBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
    let drawCount = 0;

    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => makeMove(index));
            board.appendChild(cellElement);
        });
    }

    function makeMove(index) {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                gameOver = true;
                updateScore();
                alert(`Player ${currentPlayer} wins this match!`);
                updateGameStatus(`Player ${currentPlayer} wins!`);
            } else if (gameBoard.every(cell => cell !== '')) {
                gameOver = true;
                drawCount++;
                alert('It\'s a draw!');
                updateGameStatus('Draw!');
                updateDrawCount();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateGameStatus(`Current Turn: ${currentPlayer}`);
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => gameBoard[index] === currentPlayer)
        );
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore.textContent = `X: ${parseInt(playerXScore.textContent.split(":")[1].trim()) + 1}`;
        } else {
            playerOScore.textContent = `O: ${parseInt(playerOScore.textContent.split(":")[1].trim()) + 1}`;
        }
    }

    function updateGameStatus(status) {
        gameStatusDisplay.textContent = `Game Status: ${status}`;
    }

    function updateDrawCount() {
        drawCountDisplay.textContent = `Draws: ${drawCount}`;
    }

    function startNewGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        renderBoard();
        updateGameStatus(`Current Turn: ${currentPlayer}`);
    }

    newGameBtn.addEventListener('click', startNewGame);

    renderBoard();
    updateGameStatus(`Current Turn: ${currentPlayer}`);
});
