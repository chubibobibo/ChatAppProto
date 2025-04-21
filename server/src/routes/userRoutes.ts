import express from "express";
import { registerUser } from "../controllers/userControllers";
import { registerUserValidation } from "../middleware/inputValidations";
const router = express.Router();

router.post("/register", registerUserValidation, registerUser);

export default router;
