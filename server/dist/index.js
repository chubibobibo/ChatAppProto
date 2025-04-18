"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
// import { ExpressError } from "../ExpressError/ExpressError.ts";
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Error handling - page not found
app.use("*", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});
// Error handling - Custom express error
app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong";
    const status = err.status || http_status_codes_1.StatusCodes.BAD_REQUEST;
    res.status(status).json({ message: message });
});
app.listen(process.env.PORT, () => {
    console.log("LISTENING TO PORT 3001");
});
