// import "express-async-errors";
import { Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserSchema";

/** @isAdmin determines if registered user is the first entry making it the admin*/

export const registerUser = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  const isAdmin = (await UserModel.countDocuments()) === 0;
  req.body.role = isAdmin ? "admin" : "user";
  const registeredUser = await UserModel.create(req.body);
  await registeredUser.setPassword(req.body.password);
  await registeredUser.save();

  if (!registeredUser) {
    throw new ExpressError("Cannot register user", StatusCodes.BAD_REQUEST);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Registered user successfully", registeredUser });
};
