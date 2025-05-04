import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserSchema";
import { UserType } from "../utils/types";
import { RequestHandler } from "express";
import { BodyPassword } from "../utils/types";

/** @isAdmin determines if registered user is the first entry making it the admin*/

/** REGISTER USER */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  try {
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
  } catch (err) {
    console.log(err);
    next(err);
  }
};

/** LOGGING IN USER */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  try {
    const foundUser = await UserModel.findOne({ username: req.body.username });
    if (!foundUser) {
      throw new ExpressError("User does not exist", StatusCodes.BAD_REQUEST);
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "User successfully logged in", foundUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

/** LOGGING OUT */
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "User logged out successfully" });
  });
};

/** GET LOGGED USER */
export const getLoggedUser = async (req: Request, res: Response) => {
  const loggedUser = await UserModel.findById(req.user);
  if (!loggedUser) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  }
  res.status(StatusCodes.OK).json({ message: "logged user", loggedUser });
};

/** UPDATE USER */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body as BodyPassword;

    if (!req.body) {
      throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
    }
    const foundUser = await UserModel.findById(id);
    if (!foundUser) {
      throw new ExpressError("No user found", StatusCodes.BAD_REQUEST);
    } else {
      await foundUser.setPassword(password);
      await foundUser.save();
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res
        .status(StatusCodes.OK)
        .json({ message: "User is successfully updated", updatedUser });
    }
  } catch (err) {
    console.log(err);
  }
};
