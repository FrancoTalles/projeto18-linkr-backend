import { Router } from "express";
import { handleLikes } from "../controllers/likesControllers.js";

const likesRouter = Router();

likesRouter.post("/likes", handleLikes);

export default likesRouter;