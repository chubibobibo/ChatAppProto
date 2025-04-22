import express, { NextFunction, Response, Request } from "express";
import { registerUser } from "../controllers/userControllers";
import { registerUserValidation } from "../middleware/inputValidations";
import passport from "passport";
const router = express.Router();

router.post("/register", registerUserValidation, registerUser);
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: Error, user: Express.User, info: { message: string }) => {
      if (err) {
        return next(err);
      }
    }
  );
});

export default router;
