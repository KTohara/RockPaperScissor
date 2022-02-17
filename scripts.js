// AI
let playerLives = 5
let cpuLives = 5
let currentRound = 0

const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorBtn = document.getElementById('scissor');

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

const restartBtn = document.querySelector('.restart');

function gameOver() {
  if (playerLives <= 0) {
    scoreText.innerText = "Game Over! Enemy Wins!";
    setTimeout ( () => {
      loseSound();
      restartBtn.classList.add('appear');
    }, 1300);
    return true;
  } else if (cpuLives <= 0) {
    scoreText.innerText = "Game Over! Player Wins!";
    setTimeout ( () => {
      winSound();
      restartBtn.classList.add('appear');
    }, 1300);
    return true;
  }
  return false;
}

restartBtn.addEventListener('click', () => reset());

function reset() {
  playerLives = 5
  cpuLives = 5
  currentRound = 0
  livesLeft.innerText = `Your lives: ${playerLives} | Enemy's Lives: ${cpuLives}`
  rounds.innerText = `Rounds: ${currentRound}`;

  battleGrid.classList.remove('appear');
  scoreGrid.classList.remove('appear');

  selectionButton.forEach((button) => {
    button.removeAttribute('disabled');
    button.classList.remove('selection-disabled');
  });

  restartBtn.classList.remove('appear')
}

function computerPlay() {
  const computerChoice = ["rock", "paper", "scissors"];
  const randomPick = computerChoice[Math.floor(Math.random() * computerChoice.length)];
  return randomPick;
}

const rounds = document.querySelector('.round');
const livesLeft = document.querySelector('.lives');
const scoreText = document.querySelector('.score-text');

function playRound(player, cpu) {
  let roundResult;
  if ((player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")) {
    scoreText.innerText = `You win! ${capitalize(player)} beats ${cpu.toLowerCase()}!`;
    cpuLives--;
    livesLeft.innerText = `Your lives: ${playerLives} | Enemy's Lives: ${cpuLives}`
    roundResult = 'win';
  } else if ((cpu === "rock" && player === "scissors") ||
    (cpu === "paper" && player === "rock") ||
    (cpu === "scissors" && player === "paper")) {
    scoreText.innerText = `You lose! ${capitalize(cpu)} beats ${player.toLowerCase()}!`;
    playerLives--;
    livesLeft.innerText = `Your Lives: ${playerLives} | Enemy's Lives: ${cpuLives}`
    roundResult = 'lose';
  } else if (player === cpu) {
    scoreText.innerText = `You tie! ${capitalize(player)} ties with ${cpu.toLowerCase()}!`;
    roundResult = 'tie';
  }

  currentRound++;
  rounds.innerText = `Rounds: ${currentRound}`;
  return roundResult;
}

// UI
const battleGrid = document.querySelector('.battle-grid');
const scoreGrid = document.querySelector('.score-grid');

function combatAppear() {
  battleGrid.classList.add('appear');
  scoreGrid.classList.add('appear');
}

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

const selectionButton = document.querySelectorAll('.selection');

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

function animateIcon(result) {
  cpuIcon.classList.remove('animation-win', 'animation-lose', 'animation-tie', 'animation-cpu-atk');
  playerIcon.classList.remove('animation-win','animation-tie', 'animation-lose', 'animation-player-atk');
  void cpuIcon.offsetWidth;
  void playerIcon.offsetWidth;
  
  switch (result) {
    case 'win':
      hitSound();
      playerIcon.classList.add('animation-player-atk')
      cpuIcon.classList.add('animation-lose');
      playerIcon.classList.add('animation-win');
      break;
    case 'lose':
      hitSound();
      cpuIcon.classList.add('animation-cpu-atk')
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

// Audio
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

// Helper Functions

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}