import { Router } from "express";
import { handleLikes } from "../controllers/likesControllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const likesRouter = Router();

likesRouter.post("/likes", tokenValidation, handleLikes);

export default likesRouter;