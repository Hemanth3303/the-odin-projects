export const choices = ["rock", "paper", "scissors"];

export const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

/**
 * key in format: result-humanChose-computerChose
 */
export const roundResultTextMap = new Map([
    ["human-rock-scissors", "Your rock crushed the computer's scissors"],
    ["human-paper-rock", "Your paper smothered the computer's rock"],
    ["human-scissors-paper", "Your scissors cut up the computer's paper"],

    ["computer-scissors-rock", "Your scissors got crushed by the computer's rock"],
    ["computer-rock-paper", "Your rock got smothered by the computer's paper"],
    ["computer-paper-scissors", "Your paper got cut up by the computer's scissors"],

    ["tie-rock-rock", "Rock and Rock can't do anything"],
    ["tie-paper-paper", "Paper and Paper can't do anything"],
    ["tie-scissors-scissors", "Scissors and Scissors can't do anything"],
]);
