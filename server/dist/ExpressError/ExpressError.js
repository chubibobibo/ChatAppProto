"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressError = void 0;
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
exports.ExpressError = ExpressError;
