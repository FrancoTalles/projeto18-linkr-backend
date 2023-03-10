import { Router } from "express";
import { hashtagPosts } from "../controllers/hashtagControllers.js";
import { checkHashtag } from "../middlewares/hashtagMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag/:hashtag", tokenValidation, checkHashtag, hashtagPosts);

export default hashtagRouter;
