import { Router } from "express";
import { signup, signin } from "../controllers/auth.controllers.js";
import { checkSignUp, checkSignIn } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post("/signup", checkSignUp, signup);
authRouter.post("/signin", checkSignIn, signin);

export default authRouter;