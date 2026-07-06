import { TOTAL_WIDTH, TOTAL_HEIGHT } from "./constants.js";

/**
 * @param {object} ctx 
 */
export function generateScratchpad(ctx) {
	ctx.mainContainer.replaceChildren();

	let cellWidth = TOTAL_WIDTH / ctx.numCols;
	let cellHeight = TOTAL_HEIGHT / ctx.numRows;

	for (let y = 0; y < ctx.numRows; y++) {
		let rowDiv = document.createElement("div");
		rowDiv.classList.add("rowDiv");

		for (let x = 0; x < ctx.numCols; x++) {
			let cellDiv = document.createElement("div");
			cellDiv.style.width = `${cellWidth}px`;
			cellDiv.style.height = `${cellHeight}px`;
			cellDiv.classList.add("cell");
			cellDiv.addEventListener("mouseenter", () => { handleCellPen(cellDiv); });

			rowDiv.appendChild(cellDiv);
		}

		ctx.mainContainer.appendChild(rowDiv);
	}
}

/**
 * @param {object} ctx 
 */
export function newGenBtnHandler(ctx) {
	let newRows = prompt("Enter number of cells in a row");
	if (newRows && newRows.length) {
		newRows = parseInt(newRows.trim()) || 16;
		if (newRows > 100) {
			alert("Max 100 rows, limiting to that.");
			newRows = 100;
		}
	}

	let newCols = prompt("Enter number of cells in a column");
	if (newCols && newCols.length) {
		newCols = parseInt(newCols.trim()) || 16;
		if (newCols > 100) {
			alert("Max 100 columns, limiting to that.");
			newCols = 100;
		}
	}

	ctx.numRows = newRows;
	ctx.numCols = newCols;

	generateScratchpad(ctx);
}

/**
 * @param {HTMLDivElement} cell 
 */
function handleCellPen(cell) {
	cell.classList.add("cell-drawn");

	let r = getRandomInt(0, 255);
	let g = getRandomInt(0, 255);
	let b = getRandomInt(0, 255);

	cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	let opacity = Number(cell.style.opacity) || 0;
	cell.style.opacity = Math.min(opacity + 0.1, 1);
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}