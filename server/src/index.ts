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
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "./models/UserSchema";
import userRoutes from "./routes/userRoutes";
import { v2 as cloudinary } from "cloudinary";

const app = express();

/** @ErrorType Error type checking used in express error handling.  */
type ErrorType = {
  message: string;
  status: number;
};

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses data and populates req.body if content is application/x-www-form-urlencoded
app.use(cors());

//mongoose connection
main().catch((err) => console.log(err));
async function main() {
  if (process.env.MONGO_CONNECT) {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("Connected to DB");
  }
}

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//serving public folder
//const __dirname = dirname(fileURLToPath(import.meta.url));
//app.use(express.static(path.resolve(__dirname,'./public')));
//replace with this for typescript...
app.use(express.static("./src/public"));

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

// configure passport
app.use(passport.initialize()); //initializes passport for incoming requests
app.use(passport.session()); // creates a passport object (contains user data) in session

//configure passport local mongoose
passport.use(UserModel.createStrategy()); // uses local strategy implemented as plugin in UserSchema
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// Routing
app.use("/api/auth", userRoutes);

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
