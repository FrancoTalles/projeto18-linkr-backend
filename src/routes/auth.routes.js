import { Router } from "express";
import { signup } from "../controllers/auth.controllers.js";
import { checkSignUp } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post("/signup", checkSignUp, signup);

export default authRouter;