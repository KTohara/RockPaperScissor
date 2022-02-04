// computer choice
function computerPlay() {
  const computerChoice = ["rock", "paper", "scissors"];
  let randomPick = computerChoice[Math.floor(Math.random() * computerChoice.length)];
  return capitalize(randomPick);
}

// player choice
function promptPlayer() {
  let pick = prompt("Pick one! Rock, Paper, Scissors").trim().toLowerCase();
  
  switch (pick) {
    case "rock":
    case "paper":
    case "scissors":
      return capitalize(pick);
      break;
    default:
      alert("Invalid Choice! Enter Rock, Paper, or Scissors")
      return promptPlayer();
      break;
  }
}

// round of RPS:
// function playRound(playerSelection, computerSelection) {
//   let win = `You win! ${playerSelection} beats ${computerSelection.toLowerCase()}.`;
//   let lose = `You lose! ${computerSelection} beats ${playerSelection.toLowerCase()}.`;
//   let tie = `You tie! ${playerSelection} ties with ${computerSelection.toLowerCase()}.`;

//   if ((playerSelection == "Rock" && computerSelection == "Scissors") ||
//     (playerSelection == "Paper" && computerSelection == "Rock") ||
//     (playerSelection == "Scissors" && computerSelection == "Paper")) {
//     console.log(win);
//     return 'win'
//   } else if ((computerSelection == "Rock" && playerSelection == "Scissors") ||
//     (computerSelection == "Paper" && playerSelection == "Rock") ||
//     (computerSelection == "Scissors" && playerSelection == "Paper")) {
//     console.log(lose);
//     return 'lose'
//   } else if (playerSelection == computerSelection) {
//     console.log(tie);
//   }
// }

// game logic:
// while the game is not over
  // prompt player for choice
  // pick computer choice
  // loop playRound
  // update wins/losses

function game() {
  let wins = 0
  let losses = 0
  let currentGameRecord;

  while (!isGameOver(wins, losses)) {
    let playerPick = promptPlayer(),
      cpuPick = computerPlay(),
      roundResult = playRound(playerPick, cpuPick);

    if (roundResult == 'win') {
        wins += 1;
    } else if (roundResult == 'lose') {
        losses += 1;
    }
    currentGameRecord = `Wins: ${wins} Losses: ${losses}`
    console.log(currentGameRecord);
  }

  if (wins === 5) {
    console.log("Player wins!")
  } else if (losses === 5) {
    console.log("Computer wins!")
  }
}

// checks if wins or losses reaches 5
function isGameOver(wins, losses) {
  if (wins >= 5 || losses >= 5) {
    return true;
  }
  return false;
}

// Helper functions
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}