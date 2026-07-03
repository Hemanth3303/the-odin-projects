import { resetGameContext, initializeNewGame } from "./game.js";

function main() {
	const ctx = resetGameContext();
	initializeNewGame(ctx);
}

window.addEventListener('load', main);