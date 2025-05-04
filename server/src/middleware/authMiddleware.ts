import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../ExpressError/ExpressError";

/** @isAuthenticated method from passport */

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED);
  }
  next();
};
