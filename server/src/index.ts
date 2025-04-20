import express, { NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
// import { ExpressError } from "../ExpressError/ExpressError.ts";
import session from "express-session";
import MongoStore from "connect-mongo";
import { ExpressError } from "./ExpressError/ExpressError";
const app = express();

/** @ErrorType Error type checking used in express error handling.  */
type ErrorType = {
  message: string;
  status: number;
};

dotenv.config();
app.use(express.json());
app.use(cors());

//mongoose connection
// getting-started.js
main().catch((err) => console.log(err));
async function main() {
  if (process.env.MONGO_CONNECT) {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("Connected to DB");
  }
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
  throw new ExpressError("No crypto secret string", 400);
}
const store = MongoStore.create({
  mongoUrl: mongoUrlString,
  touchAfter: 24 * 3600, // in seconds = 1 day
  crypto: {
    secret: cryptoSecretString,
  },
});

//setup express sessions
const sessionSecretString = process.env.SESSION_SECRET;
if (!sessionSecretString) {
  throw new ExpressError("No session secret string", 400);
}
app.set("trust proxy", 1); //trust first proxy
app.use(
  session({
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
  })
);

// Error handling - page not found
/** @_req uses the underscore to indicate it’s unused  to avoid parsing errors for using "*" as path*/
app.use((_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});

// Error handling - Custom express error
app.use((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || "Something went wrong";
  const status = err.status || StatusCodes.BAD_REQUEST;
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT} `);
});
