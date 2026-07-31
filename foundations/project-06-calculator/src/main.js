import { calculator } from "./calculator.js";

function main() {
    const ctx = {
        ui: {
            inputs: document.getElementById("inputField"),
            result: document.getElementById("resultField"),
        },
        btns: {
            btn0: document.getElementById("btn-0"),
            btn1: document.getElementById("btn-1"),
            btn2: document.getElementById("btn-2"),
            btn3: document.getElementById("btn-3"),
            btn4: document.getElementById("btn-4"),
            btn5: document.getElementById("btn-5"),
            btn6: document.getElementById("btn-6"),
            btn7: document.getElementById("btn-7"),
            btn8: document.getElementById("btn-8"),
            btn9: document.getElementById("btn-9"),
            btnPlus: document.getElementById("btn-plus"),
            btnMinus: document.getElementById("btn-minus"),
            btnStar: document.getElementById("btn-star"),
            btnSlash: document.getElementById("btn-slash"),
            btnClear: document.getElementById("btn-clear"),
            btnClearAll: document.getElementById("btn-clear-all"),
            btnEqual: document.getElementById("btn-equals"),
        }
    };

    calculator(ctx);
}

window.addEventListener('load', main);
