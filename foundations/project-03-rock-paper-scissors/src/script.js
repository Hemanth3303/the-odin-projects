'use strict';

const choices = ["rock", "paper", "scissors"];
const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

function main() {
    const NUM_ROUNDS = 5;
    let scoreState = {
        human: 0,
        computer: 0,
    };

    let round = 0;
    do {
        alert(`Round ${round + 1} of ${NUM_ROUNDS}`);
        const result = playRound();
        if (result === "human") {
            scoreState.human++;
            alert("You win that round.");
        }
        else if (result === "computer") {
            scoreState.computer++;
            alert("Computer wins that round.");
        }
        else if (result === "tie") {
            alert("You tied with Computer that round.");
        }
        else {
            alert("Something went terribly wrong.");
            throw new Error("INVALID STATE REACHED")
        }

        alert(`Current score: YOU: ${scoreState.human} || COMPUTER: ${scoreState.computer}`);

        round++;
    }
    while (round != NUM_ROUNDS);

    alert(`Final score: YOU: ${scoreState.human} || COMPUTER: ${scoreState.computer}`);
    if (scoreState.human > scoreState.computer) {
        alert("You win. Computer lost. Refresh Page to play again");
    }
    else if (scoreState.human < scoreState.computer) {
        alert("You lost. Computer wins Refresh page to try again.");
    }
    else {
        alert("It's a tie. Refresh page to try again.");
    }
}

/**
 * @returns {string} result
 */
function playRound() {
    let computerChoice = getComputerChoice();
    let humanChoice = getHumanChoice();

    alert(`You chose ${humanChoice} while computer chose ${computerChoice}.`);

    if (beats[humanChoice] === computerChoice) {
        return "human";
    }
    if (beats[computerChoice] === humanChoice) {
        return "computer";
    }
    else {
        return "tie";
    }
}

/**
 * @returns {string} computerchoice
 */
function getComputerChoice() {
    /*
      assume Math.random() return the value x, then
      r = [ x * (max - min + 1) + min]

      so here, r = [x * (2 - 0 + 1) + 0] => x * 3
      duh.
    */
    let r = Math.floor(Math.random() * 3);
    return choices[r];
}

/**
 * @returns {string}
 */
function getHumanChoice() {
    let choice = prompt("Choose: rock, paper or scissors");
    if (!choice) {
        alert("Please enter something next time. Refresh page to try again.");
        throw new Error("EMPTY USER INPUT");
    }

    choice = choice.trim().toLowerCase();

    if (!choices.includes(choice)) {
        alert("Please try reading next time. Refresh page to try again.");
        throw new Error("INVALID USER INPUT");
    }

    return choice;
}

window.addEventListener('load', main);
