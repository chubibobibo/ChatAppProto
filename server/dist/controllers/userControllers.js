"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
require("express-async-errors");
const ExpressError_1 = require("../ExpressError/ExpressError");
const http_status_codes_1 = require("http-status-codes");
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
/** @isAdmin determines if registered user is the first entry making it the admin*/
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new ExpressError_1.ExpressError("No data received", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const isAdmin = (yield UserSchema_1.default.countDocuments()) === 0;
    req.body.role = isAdmin ? "admin" : "user";
    const registeredUser = yield UserSchema_1.default.create(req.body);
    yield registeredUser.setPassword(req.body.password);
    yield registeredUser.save();
    if (!registeredUser) {
        throw new ExpressError_1.ExpressError("Cannot register user", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Registered user successfully", registeredUser });
});
exports.registerUser = registerUser;
