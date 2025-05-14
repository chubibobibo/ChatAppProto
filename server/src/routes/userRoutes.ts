import express, { NextFunction, Response, Request } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedUser,
  updateUser,
  getChatUsers,
} from "../controllers/userControllers";
import {
  registerUserValidation,
  loginUserValidation,
  updateUserValidation,
} from "../middleware/inputValidations";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import { rateLimit } from "express-rate-limit";
import { isLoggedIn } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerMiddleware";

const router = express.Router();

//Api request limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  message: "Too many requests, try again after 10 minutes",
});

router.post(
  "/register",
  upload.single("photoUrl"),
  registerUserValidation,
  registerUser
);

/** @authenticate passport method that authenticates using the local strategy  */
/** @user if auth is successful this will be the user obj */
/** @info will contain err messages */
router.post(
  "/login",
  limiter,
  loginUserValidation,
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

router.get("/chatUsers", getChatUsers);

router.post("/logout", logoutUser);

router.get("/getLoggedUser", getLoggedUser);

router.patch("/updateUser/:id", isLoggedIn, updateUserValidation, updateUser);

export default router;
