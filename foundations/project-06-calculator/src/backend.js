import { DivideByZeroError } from "./errors.js";

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} sum
 */
export function add(a, b) {
    return a + b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} difference
 */
export function subtract(a, b) {
    return a - b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} product
 */
export function multiply(a, b) {
    return a * b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} result
 * @throws {DivideByZeroError}
 */
export function divide(a, b) {
    if (b === 0) {
        throw new DivideByZeroError("Division by zero is not allowed dummy!");
    }
    return a / b;
}
