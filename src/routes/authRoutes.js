import { Router } from "express";
import { signup, signin } from "../controllers/authControllers.js";
import { checkSignUp, checkSignIn } from "../middlewares/authMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", checkSignUp, signup);
authRouter.post("/signin", checkSignIn, signin);

export default authRouter;