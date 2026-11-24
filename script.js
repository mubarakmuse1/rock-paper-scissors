/* =========================
   GAME CONFIGURATION
========================= */

const choices = ["Rock", "Paper", "Scissors"];

const WINNING_SCORE = 5;

const score = {
  player: 0,
  computer: 0,
};

let gameStarted = false;
let gameOver = false;

/* =========================
   DOM ELEMENTS
========================= */

const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");

const turnDisplay = document.getElementById("turn");
const gameMessage = document.getElementById("game-message");
const resultDisplay = document.getElementById("result");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const choiceButtons = document.querySelectorAll(".choice");

/* =========================
   ENABLE / DISABLE CHOICES
========================= */

function updateChoiceButtons() {
  choiceButtons.forEach((button) => {
    button.disabled = !gameStarted || gameOver;
  });
}

/* =========================
   START GAME
========================= */

function startGame() {
  if (gameStarted && !gameOver) {
    return;
  }

  gameStarted = true;
  gameOver = false;

  score.player = 0;
  score.computer = 0;

  updateScore();

  playerChoiceDisplay.textContent = "-";
  computerChoiceDisplay.textContent = "-";

  resultDisplay.textContent = "Let's play!";
  resultDisplay.className = "";

  turnDisplay.textContent = "Your turn! Choose your move.";
  gameMessage.textContent = "First to 5 points wins!";

  startButton.textContent = "▶ Game Started";
  startButton.disabled = true;

  restartButton.disabled = false;

  updateChoiceButtons();
}

/* =========================
   COMPUTER CHOICE
========================= */

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);

  return choices[randomIndex];
}

/* =========================
   DETERMINE WINNER
========================= */

function getWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }

  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    return "player";
  }

  return "computer";
}

/* =========================
   PLAY GAME
========================= */

function playGame(playerChoice) {
  if (!gameStarted || gameOver) {
    return;
  }

  if (!choices.includes(playerChoice)) {
    return;
  }

  const computerChoice = getComputerChoice();

  // Display choices
  playerChoiceDisplay.textContent = playerChoice;
  computerChoiceDisplay.textContent = computerChoice;

  // Determine round winner
  const winner = getWinner(playerChoice, computerChoice);

  // Handle result
  if (winner === "draw") {
    resultDisplay.textContent = "🤝 It's a Draw!";
    resultDisplay.className = "draw";

    turnDisplay.textContent = "Nobody wins this round!";
    gameMessage.textContent = "Try another move.";
  } else if (winner === "player") {
    score.player++;

    resultDisplay.textContent = "🎉 You Win This Round!";
    resultDisplay.className = "win";

    turnDisplay.textContent = "Great job! You scored!";
    gameMessage.textContent = "Keep going!";
  } else {
    score.computer++;

    resultDisplay.textContent = "😢 Computer Wins This Round!";
    resultDisplay.className = "lose";

    turnDisplay.textContent = "Computer scored!";
    gameMessage.textContent = "Don't give up!";
  }

  updateScore();

  // Check if the match is over
  checkGameOver();
}

/* =========================
   UPDATE SCORE
========================= */

function updateScore() {
  playerScore.textContent = score.player;
  computerScore.textContent = score.computer;
}

/* =========================
   CHECK WINNING CONDITION
========================= */

function checkGameOver() {
  if (score.player < WINNING_SCORE && score.computer < WINNING_SCORE) {
    return;
  }

  gameOver = true;

  updateChoiceButtons();

  startButton.disabled = false;
  startButton.textContent = "▶ Play Again";

  if (score.player === WINNING_SCORE) {
    turnDisplay.textContent = "🏆 YOU WON THE GAME!";
    gameMessage.textContent = "Congratulations! You defeated the computer!";

    resultDisplay.textContent = "🎉 CHAMPION!";
    resultDisplay.className = "win";
  } else {
    turnDisplay.textContent = "💻 COMPUTER WON THE GAME!";
    gameMessage.textContent = "Better luck next time! You can try again.";

    resultDisplay.textContent = "😢 GAME OVER!";
    resultDisplay.className = "lose";
  }
}

/* =========================
   RESTART GAME
========================= */

function restartGame() {
  gameStarted = false;
  gameOver = false;

  score.player = 0;
  score.computer = 0;

  updateScore();

  playerChoiceDisplay.textContent = "-";
  computerChoiceDisplay.textContent = "-";

  resultDisplay.textContent = "Let's play!";
  resultDisplay.className = "";

  turnDisplay.textContent = "Ready to play?";
  gameMessage.textContent = "Press Start Game to begin.";

  startButton.disabled = false;
  startButton.textContent = "▶ Start Game";

  restartButton.disabled = true;

  updateChoiceButtons();
}

/* =========================
   EVENT LISTENERS
========================= */

// Start button
startButton.addEventListener("click", startGame);

// Restart button
restartButton.addEventListener("click", restartGame);

// Player choices
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;

    playGame(playerChoice);
  });
});

/* =========================
   INITIAL GAME STATE
========================= */

restartGame();
