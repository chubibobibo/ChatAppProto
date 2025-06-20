import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import { NextFunction, Response, Request } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserSchema";

//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues, // spread to treat validateValues as an array of function instead of a single middleware (typescript)
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages: string[] = errors
          .array()
          .map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages as any, StatusCodes.BAD_REQUEST); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

export const registerUserValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters")
    .custom(async (username) => {
      const foundUsername = await UserModel.findOne({ username: username });
      if (foundUsername) {
        throw new ExpressError(
          "Username already exist",
          StatusCodes.BAD_REQUEST
        );
      }
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty ")
    .isLength({ min: 5 })
    .withMessage("First name must be at least 5 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Last name must be at least 5 characters"),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError("Email already exist", StatusCodes.BAD_REQUEST);
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

export const loginUserValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

/** @param id prevents updating of user profile for unauthorized users */
/** obtains id from the form and verifies if the logged user(req.user._id) are not the same */
/** id and req.user._id must be converted into strings to match */
export const updateUserValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters")
    .custom(async (username, { req }) => {
      const foundUsername = await UserModel.findOne({ username: username });
      if (foundUsername && req.user.username !== foundUsername.username) {
        throw new ExpressError(
          "Username already exist",
          StatusCodes.BAD_REQUEST
        );
      }
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty ")
    .isLength({ min: 5 })
    .withMessage("First name must be at least 5 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Last name must be at least 5 characters"),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .custom(async (email, { req }) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail && req.user.email !== foundEmail.email) {
        throw new ExpressError("Email already exist", StatusCodes.BAD_REQUEST);
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  param("id").custom(async (id, { req }) => {
    // console.log(req.user._id.toString());
    // console.log({ id });
    if (id.toString() != req.user._id.toString()) {
      throw new ExpressError(
        "User is not authorized. different id",
        StatusCodes.UNAUTHORIZED
      );
    }
  }),
]);
