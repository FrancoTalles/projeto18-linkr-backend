import { Router } from "express";
import { checkHashtag } from "../middlewares/hashtagMiddleware.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag/:hashtag", checkHashtag, );

export default hashtagRouter;
