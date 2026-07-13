import { generateScratchpad, newGenBtnHandler } from "./scratchpad.js";

function main() {
    let mainContainer = document.getElementById("mainContainer");
    let genNewBtn = document.getElementById("genNewBtn");

    let ctx = {
        mainContainer,
        genNewBtn,
        numRows: 16,
        numCols: 16,
    };

    genNewBtn.addEventListener('click', () => { newGenBtnHandler(ctx); });
    generateScratchpad(ctx);
}

window.addEventListener('load', main);
