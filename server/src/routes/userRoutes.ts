import express, { NextFunction, Response, Request } from "express";
import { registerUser, loginUser } from "../controllers/userControllers";
import { registerUserValidation } from "../middleware/inputValidations";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
const router = express.Router();

router.post("/register", registerUserValidation, registerUser);

/** @authenticate passport method that authenticates using the local strategy  */
/** @user if auth is successful this will be the user obj */
/** @info will contain err messages */
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    // if there is an err during authentication, it is passed to the next middleware or route
    passport.authenticate(
      "local",
      (err: Error, user: Express.User, info: { message: string }) => {
        // auth error
        if (err) {
          return next(err);
        }
        // handling auth failure (no user)
        if (!user) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: info.message || "Username or Password incorrect",
          });
        }
        //authenticated user
        /** @user once auth is successful. user is serialized and stores user's id in session (user stays logged in) */
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          return loginUser(req, res, next); //function handles further actions like sending success response upon successfull authentication
        });
      }
    )(req, res, next);
  },
  loginUser
);

export default router;
