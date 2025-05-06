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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
// import { ExpressError } from "../ExpressError/ExpressError.ts";
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const ExpressError_1 = require("./ExpressError/ExpressError");
const passport_1 = __importDefault(require("passport"));
const UserSchema_1 = __importDefault(require("./models/UserSchema"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//mongoose connection
// getting-started.js
main().catch((err) => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.MONGO_CONNECT) {
            yield mongoose_1.default.connect(process.env.MONGO_CONNECT);
            console.log("Connected to DB");
        }
    });
}
// Test routes
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello" });
// });
// Setup mongo store for storing sessions
// type check cryptoSecretString to avoid type errors
const mongoUrlString = process.env.MONGO_CONNECT;
const cryptoSecretString = process.env.CRYPTO_SECRET;
if (!cryptoSecretString) {
    throw new ExpressError_1.ExpressError("No crypto secret string", 400);
}
const store = connect_mongo_1.default.create({
    mongoUrl: mongoUrlString,
    touchAfter: 24 * 3600, // in seconds = 1 day
    crypto: {
        secret: cryptoSecretString,
    },
});
//setup express sessions
const sessionSecretString = process.env.SESSION_SECRET;
if (!sessionSecretString) {
    throw new ExpressError_1.ExpressError("No session secret string", 400);
}
app.set("trust proxy", 1); //trust first proxy
app.use((0, express_session_1.default)({
    store,
    name: process.env.SESSION_NAME,
    secret: sessionSecretString,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() * 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
}));
// configure passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//configure passport local mongoose
passport_1.default.use(UserSchema_1.default.createStrategy());
// Error handling - page not found
/** @_req uses the underscore to indicate it’s unused  to avoid parsing errors for using "*" as path*/
app.use((_req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});
// Routing
app.use("/api/auth", userRoutes_1.default);
// Error handling - Custom express error
app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong";
    const status = err.status || http_status_codes_1.StatusCodes.BAD_REQUEST;
    res.status(status).json({ message: message });
});
app.listen(process.env.PORT, () => {
    console.log(`SERVING PORT ${process.env.PORT} `);
});
