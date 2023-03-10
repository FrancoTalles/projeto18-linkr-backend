import { Router } from "express";
import { getHashtags, hashtagPosts } from "../controllers/hashtagControllers.js";
import { checkHashtag } from "../middlewares/hashtagMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag/:hashtag", tokenValidation, checkHashtag, hashtagPosts);
hashtagRouter.get("/hashtags", getHashtags)

export default hashtagRouter;
