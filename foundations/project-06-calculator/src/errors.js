export class DivideByZeroError extends Error {
    constructor(message) {
        super(message);
        this.name = "DivideByZeroError";
        this.reason = "Fatal Math Error: Division By Zero Is Undefined";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DivideByZeroError);
        }
    }
}

export class ImpossibleState extends Error {
    constructor(message) {
        super(message);
        this.name = "ImpossibleState";
        this.reason = "Reached an impossible state";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ImpossibleState);
        }
    }
}
