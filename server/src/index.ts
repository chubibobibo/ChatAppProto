import express, { NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
// import { ExpressError } from "../ExpressError/ExpressError.ts";
const app = express();

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
