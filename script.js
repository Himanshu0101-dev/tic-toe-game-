// --- Game state ---
const boardEl = document.querySelector('.gameBoard');
const cells = Array.from(document.querySelectorAll('.cell'));
const playerTurnEl = document.getElementById('playerTurn');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function setTurnText() {
  playerTurnEl.textContent = gameActive ? `Player ${currentPlayer}'s turn` : '';
}

function checkWin(p) {
  for (let line of wins) {
    if (line.every(i => board[i] === p)) {
      // highlight winning cells
      line.forEach(i => cells[i].classList.add("win"));
      return true;
    }
  }
  return false;
}

function handleMove(index, btn) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  btn.textContent = currentPlayer;
  btn.disabled = true;

  if (checkWin(currentPlayer)) {
    resultEl.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    cells.forEach(c => c.disabled = true);
    setTurnText();
    return;
  }

  if (board.every(v => v)) {
    resultEl.textContent = `😅 It's a draw!`;
    gameActive = false;
    setTurnText();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setTurnText();
}

boardEl.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell')) return;
  const index = Number(e.target.getAttribute('data-index'));
  handleMove(index, e.target);
});

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  resultEl.textContent = '';
  cells.forEach(c => { 
    c.textContent = ''; 
    c.disabled = false; 
    c.classList.remove("win"); 
  });
  setTurnText();
}

restartBtn.addEventListener('click', resetGame);

setTurnText();

