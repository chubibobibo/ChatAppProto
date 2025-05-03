import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/** @isAuthenticated method from passport */

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User is not authenticated" });
  }
  next();
};
