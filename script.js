
// Array containing the game choices
const choices = ["Rock", "Paper", "Scissors"];

// Object to track the scores
const score = {
    player: 0,
    computer: 0
};

// Main game function
function playGame(playerChoice) {

    // Computer randomly selects a choice
    const computerChoice = choices[
        Math.floor(Math.random() * choices.length)
    ];

    // Display both choices
    document.getElementById("player-choice").textContent =
        "You chose: " + playerChoice;

    document.getElementById("computer-choice").textContent =
        "Computer chose: " + computerChoice;

    // Determine the winner using if/else
    if (playerChoice === computerChoice) {

        document.getElementById("result").textContent =
            "🤝 It's a Draw!";

        document.getElementById("turn").textContent =
            "Nobody wins this round!";

    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {

        score.player++;

        document.getElementById("result").textContent =
            "🎉 You Win!";

        document.getElementById("turn").textContent =
            "Great job! Your turn again.";

    } else {

        score.computer++;

        document.getElementById("result").textContent =
            "😢 Computer Wins!";

        document.getElementById("turn").textContent =
            "Computer wins this round! Try again.";

    }

    // Update the scores on the page
    document.getElementById("player-score").textContent =
        score.player;

    document.getElementById("computer-score").textContent =
        score.computer;
}

// Reset the game
function resetGame() {

    score.player = 0;
    score.computer = 0;

    document.getElementById("player-score").textContent = 0;
    document.getElementById("computer-score").textContent = 0;

    document.getElementById("player-choice").textContent =
        "You chose: -";

    document.getElementById("computer-choice").textContent =
        "Computer chose: -";

    document.getElementById("result").textContent =
        "Let's play!";

    document.getElementById("turn").textContent =
        "Your turn! Choose your move.";
}
