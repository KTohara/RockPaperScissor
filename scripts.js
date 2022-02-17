// AI
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorBtn = document.getElementById('scissor');

const selectionButton = document.querySelectorAll('.selection');

let playerLives = 5
let cpuLives = 5
let currentRound = 0

const restartBtn = document.querySelector('.restart');
function gameOver() {
  if (playerLives <= 0) {
    scoreText.innerText = "Game Over! Enemy Wins!";
    return true;
  } else if (cpuLives <= 0) {
    scoreText.innerText = "Game Over! Player Wins!";
    return true;
  }
    restartBtn.classList.add('appear');
  return false;
}

rockBtn.addEventListener('click', () => game('rock'));
paperBtn.addEventListener('click', () => game('paper'));
scissorBtn.addEventListener('click', () => game('scissors'));

function game(playerSelection) {
  if (!gameOver()) {
    const cpuPick = computerPlay();
    combatAppear();
    updatePlayerIcon(playerSelection, cpuPick);
    const result = playRound(playerSelection, cpuPick);
    disableBtn();
    animateIcon(result);
  }
}

// Round of RPS:
const rounds = document.querySelector('.round');
const livesLeft = document.querySelector('.lives');
const scoreText = document.querySelector('.score-text');

function playRound(player, cpu) {
  let roundResult;
  if ((player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")) {
    scoreText.innerText = `You win! ${player} beats ${cpu.toLowerCase()}!`;
    cpuLives--;
    livesLeft.innerText = `Your lives: ${playerLives} | Enemy's Lives: ${cpuLives}`
    roundResult = 'win';
  } else if ((cpu === "rock" && player === "scissors") ||
    (cpu === "paper" && player === "rock") ||
    (cpu === "scissors" && player === "paper")) {
    scoreText.innerText = `You lose! ${cpu} beats ${player.toLowerCase()}!`;
    playerLives--;
    livesLeft.innerText = `Your Lives: ${playerLives} | Enemy's Lives: ${cpuLives}`
    roundResult = 'lose';
  } else if (player === cpu) {
    scoreText.innerText = `You tie! ${player} ties with ${cpu.toLowerCase()}!`;
    roundResult = 'tie';
  }

  currentRound++;
  rounds.innerText = `Rounds: ${currentRound}`;
  return roundResult;
}

// CPU Choice
function computerPlay() {
  const computerChoice = ["rock", "paper", "scissors"];
  const randomPick = computerChoice[Math.floor(Math.random() * computerChoice.length)];
  return randomPick;
}

// Player Selection
const playerIcon = document.querySelector('.player-icon');
const cpuIcon = document.querySelector('.cpu-icon');

function updatePlayerIcon(playerPick, cpuPick) {
  playerIcon.classList.remove('fa-hand-rock', 'fa-hand-paper', 'fa-hand-scissors')
  if (playerPick === 'rock') {
    playerIcon.classList.add('fa-hand-rock');
  } else if (playerPick === 'paper') {
    playerIcon.classList.add('fa-hand-paper');
  } else if (playerPick === 'scissors') {
    playerIcon.classList.add('fa-hand-scissors');
  }

  cpuIcon.classList.remove('fa-hand-rock', 'fa-hand-paper', 'fa-hand-scissors')
  if (cpuPick === 'rock') {
    cpuIcon.classList.add('fa-hand-rock');
  } else if (cpuPick === 'paper') {
    cpuIcon.classList.add('fa-hand-paper');
  } else if (cpuPick === 'scissors') {
    cpuIcon.classList.add('fa-hand-scissors');
  }
}

function animateIcon(result) {
  cpuIcon.classList.remove('animation-win', 'animation-lose', 'animation-tie');
  playerIcon.classList.remove('animation-win','animation-tie', 'animation-lose');
  void cpuIcon.offsetWidth;
  void playerIcon.offsetWidth;
  
  switch (result) {
    case 'win':
      hitSound();
      cpuIcon.classList.add('animation-lose');
      playerIcon.classList.add('animation-win');      
      break;
    case 'lose':
      hitSound();
      playerIcon.classList.add('animation-lose');
      cpuIcon.classList.add('animation-win');
      break;
    case 'tie':
      missSound();
      playerIcon.classList.add('animation-tie');
      cpuIcon.classList.add('animation-tie');
      break;
  }
}

function disableBtn() {
  if (gameOver()) {
    selectionButton.forEach((button) => {
      button.setAttribute('disabled', '');
      button.classList.add('selection-disabled');
    });
    return;
  }

  selectionButton.forEach((button) => {
    button.classList.add('selection-disabled');
    button.disabled = true;
    setTimeout( () => {
    button.classList.remove('selection-disabled');
    button.disabled = false;
    }, 1300);
  });
}

const battleGrid = document.querySelector('.battle-grid');
const scoreGrid = document.querySelector('.score-grid');

function combatAppear() {
  battleGrid.classList.add('appear');
  scoreGrid.classList.add('appear');
}

const modal = document.querySelector('.modal');
const modalMsg = document.querySelector('.modal-msg');
const modalBtn = document.querySelector('.restart');

function reset() {
  playerLives = 5
  cpuLives = 5
  currentRound = 0
}

function hitSound() {
  const audio = document.querySelector('.hit');
  audio.play();
}

function missSound() {
  const audio = document.querySelector('.miss');
  audio.play();
}

function winSound() {
  const audio = document.querySelector('.win');
  audio.play();
}

function loseSound() {
  const audio = document.querySelector('.lose');
  audio.play();
}
