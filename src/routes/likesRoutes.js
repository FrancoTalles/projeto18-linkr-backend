import { Router } from "express";
import { handleLikes,countLikes } from "../controllers/likesControllers.js";

const likesRouter = Router();

likesRouter.post("/likes", handleLikes);
likesRouter.get("/postLikes/:postId", countLikes);

export default likesRouter;