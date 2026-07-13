import { choices, beats, roundResultTextMap } from "./constants.js";

let activeGameController = null;

/**
 * @param {number} totalNumberOfRounds
 * @returns {object} new game context
 */
export function resetGameContext(totalNumberOfRounds = 5) {

    if (activeGameController) {
        activeGameController.abort();
    }

    const humanScoreSpan = document.getElementById("humanScore");
    const computerScoreSpan = document.getElementById("computerScore");
    const currentRoundSpan = document.getElementById("currentRound");
    const totalRoundsSpan = document.getElementById("numRounds");

    const rockBtn = document.getElementById("rockBtn");
    const paperBtn = document.getElementById("paperBtn");
    const scissorsBtn = document.getElementById("scissorsBtn");

    const roundModal = document.getElementById("roundModal");
    const roundModalTitleTextSpan = document.getElementById("roundModalTitleText");
    const roundModalInfoTextSpan = document.getElementById("roundModalInfoText");
    const nextRoundBtn = document.getElementById("nextRoundBtn");

    const gameOverModal = document.getElementById("gameOverModal");
    const gameOverModalTitleTextSpan = document.getElementById("gameOverModalTitleText");
    const gameOverModalInfoTextSpan = document.getElementById("gameOverModalInfoText");
    const playAgainBtn = document.getElementById("playAgainBtn");

    activeGameController = new AbortController();

    return {
        gameSignal: activeGameController.signal,
        totalNumberOfRounds,
        currentRound: 1,
        scores: {
            human: 0,
            computer: 0,
        },
        humanScoreSpan,
        computerScoreSpan,
        currentRoundSpan,
        totalRoundsSpan,
        rockBtn,
        paperBtn,
        scissorsBtn,
        roundModal,
        roundModalTitleTextSpan,
        roundModalInfoTextSpan,
        nextRoundBtn,
        gameOverModal,
        gameOverModalTitleTextSpan,
        gameOverModalInfoTextSpan,
        playAgainBtn,
    };
}

/**
 * @param {object} ctx current game context
 */
export function initializeNewGame(ctx) {
    if (!ctx) {
        alert("Something horrible went wrong");
        throw new Error("EMPTY CONTEXT");
    }

    ctx.currentRoundSpan.textContent = ctx.currentRound;
    ctx.totalRoundsSpan.textContent = ctx.totalNumberOfRounds;

    ctx.humanScoreSpan.textContent = ctx.scores.human;
    ctx.computerScoreSpan.textContent = ctx.scores.computer;

    ctx.roundModal.classList.add("hidden");
    ctx.gameOverModal.classList.add("hidden");

    ctx.rockBtn.addEventListener(
        "click",
        () => { handleChoiceClick("rock", ctx); },
        { signal: ctx.gameSignal }
    );
    ctx.paperBtn.addEventListener(
        "click",
        () => { handleChoiceClick("paper", ctx); },
        { signal: ctx.gameSignal }
    );
    ctx.scissorsBtn.addEventListener(
        "click",
        () => { handleChoiceClick("scissors", ctx); },
        { signal: ctx.gameSignal }
    );

    ctx.nextRoundBtn.addEventListener(
        "click",
        () => { handleNextRound(ctx); },
        { signal: ctx.gameSignal }
    );

    ctx.playAgainBtn.addEventListener(
        "click",
        () => { handlePlayAgain(ctx); },
        { signal: ctx.gameSignal }
    );
}

/**
 * @param {string} humanChose
 * @param {object} ctx
 */
function handleChoiceClick(humanChose, ctx) {
    if (!choices.includes(humanChose)) {
        alert("Something horrible went wrong");
        throw new Error("INVALID HUMAN CHOICE!");
    }

    playRound(humanChose, ctx);
}

function handlePlayAgain(ctx) {
    ctx.gameOverModal.classList.add("hidden");
    ctx = resetGameContext();
    initializeNewGame(ctx);
}

/**
 * @param {string} humanChose
 * @param {object} ctx
 */
function playRound(humanChose, ctx) {
    const computerChose = getComputerChoice();

    let { result, info } = resolveChoiceWinner(humanChose, computerChose, beats);

    if (result === "human") {
        ctx.roundModalTitleTextSpan.textContent = "You Win This Round!";
        ctx.roundModalInfoTextSpan.textContent = info;

        ctx.scores.human++;
    }
    else if (result === "computer") {
        ctx.roundModalTitleTextSpan.textContent = "You Lost This Round!";
        ctx.roundModalInfoTextSpan.textContent = info;

        ctx.scores.computer++;
    }
    else if (result === "tie") {
        ctx.roundModalTitleTextSpan.textContent = "Round Tied!";
        ctx.roundModalInfoTextSpan.textContent = info;
    }
    else {
        alert("Something horrible went wrong");
        throw new Error("INVALID RESULT");
    }

    ctx.humanScoreSpan.textContent = ctx.scores.human;
    ctx.computerScoreSpan.textContent = ctx.scores.computer;
    ctx.roundModal.classList.remove("hidden");
}

/**
 * @param {string} humanChose
 * @param {string} computerChose
 * @param {object} beats
 * @returns {{ result: string, info: string }}
 */
function resolveChoiceWinner(humanChose, computerChose, beats) {
    let result = null;
    if (beats[humanChose] === computerChose) {
        result = "human";
    }
    else if (beats[computerChose] === humanChose) {
        result = "computer";
    }
    else {
        result = "tie";
    }

    const infoKey = `${result}-${humanChose}-${computerChose}`;
    let info = roundResultTextMap.get(infoKey);
    return {
        result,
        info,
    };
}

function handleNextRound(ctx) {
    ctx.roundModal.classList.add("hidden");
    if (ctx.currentRound < ctx.totalNumberOfRounds) {
        ctx.currentRound++;
        ctx.currentRoundSpan.textContent = ctx.currentRound;
    }
    else {
        if (ctx.scores.human > ctx.scores.computer) {
            ctx.gameOverModalTitleTextSpan.textContent = "Victory!";
            ctx.gameOverModalInfoTextSpan.textContent = "You won the tournament!";
        }
        else if (ctx.scores.human < ctx.scores.computer) {
            ctx.gameOverModalTitleTextSpan.textContent = "Defeat!";
            ctx.gameOverModalInfoTextSpan.textContent = "You lost the tournament!";
        }
        else {
            ctx.gameOverModalTitleTextSpan.textContent = "Tie!";
            ctx.gameOverModalInfoTextSpan.textContent = "You tied with the computer!";
        }
        ctx.gameOverModal.classList.remove("hidden");
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
