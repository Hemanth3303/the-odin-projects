import { add, divide, multiply, subtract } from "./backend.js";
import { ImpossibleState } from "./errors.js";

const state = {
    lhs: "0",
    op: "nop",
    rhs: "0",
    result: "0"
};

let operators = ["+", "-", "*", "/"];
let actions = ["=", "AC", "C"];

/**
 * @param {object} ctx
 */
export function calculator(ctx) {
    redraw(ctx.ui);
    for (let btnKey in ctx.btns) {
        const btn = ctx.btns[btnKey];
        btn.addEventListener("click", () => { apply(btn.textContent, ctx.ui) });
    }
}

/**
 *
 * @param {string} symbol
 * @param {object} ui
 */
function apply(symbol, ui) {
    if (operators.includes(symbol)) {
        if (state.lhs !== "0") {
            state.op = symbol;
        }
        if (state.rhs !== "0" && state.op !== "nop") {
            evaluate("=", true);
        }
    }
    else if (actions.includes(symbol)) {
        evaluate(symbol);
    }
    else {
        if (Number.isNaN(Number(symbol))) {
            throw new ImpossibleState("how did that happen");
        }
        if (state.op === "nop") {
            state.lhs = stripAndAppend(state.lhs, symbol);
        }
        else {
            state.rhs = stripAndAppend(state.rhs, symbol);
        }
    }

    redraw(ui);
}

/**
 *
 * @param {string} action
 * @param {boolean} keep
 */
function evaluate(action, keep = false) {
    if (action === "=") {
        if (state.op === "nop") {
            return;
        }
        const lhs = parseFloat(state.lhs);
        const rhs = parseFloat(state.rhs);
        if (Number.isNaN(lhs) || Number.isNaN(rhs)) {
            resetState();
            state.result = "Fuck you too. Some error or shit";
            return;
        }
        const result = parse(lhs, rhs, state.op);

        const oldop = state.op;
        resetState();
        state.result = result;
        state.lhs = result;
        if (keep) {
            state.op = oldop;
        }
    }
    else if (action === "AC") {
        resetState();
    }
    else if (action === "C") {
        if (state.op === "nop") {
            state.lhs = rstrip(state.lhs);
        }
        else {
            state.rhs = rstrip(state.rhs);
        }
    }
    else {
        throw new ImpossibleState("how did that happen");
    }
}

/**
 *
 * @param {number} lhs
 * @param {number} rhs
 * @param {string} op
 * @returns {string|number}
 */
function parse(lhs, rhs, op) {
    switch (op) {
        case '+':
            return add(lhs, rhs);
        case '-':
            return subtract(lhs, rhs);
        case '*':
            return multiply(lhs, rhs);
        case '/':
            {
                try {
                    return divide(lhs, rhs);
                }
                catch(error) {
                    return error.name;
                }
            }
        default:
            throw new ImpossibleState("how did that happen");
    }
}

function resetState() {
    state.lhs = "0";
    state.rhs = "0";
    state.op = "nop";
    state.result = "0";
}

/**
 *
 * @param {object} ui
 */
function redraw(ui) {
    if (state.op !== "nop") {
        ui.inputs.textContent = `${state.lhs} ${state.op} ${state.rhs}`;
    }
    else {
        ui.inputs.textContent = `${state.lhs}`;
    }
    ui.result.textContent = `${state.result}`;
}

/**
 *
 * @param {string} text
 * @param {string} symbol
 * @returns {string}
 */
function stripAndAppend(text, symbol) {
    if (text === '0') {
        return symbol;
    }
    else {
        return (text + symbol);
    }
}

/**
 *
 * @param {string} text
 * @returns {string}
 */
function rstrip(text) {
    if (text === "0" || text.length <= 1) {
        return "0";
    }

    return text.slice(0, -1);
}
