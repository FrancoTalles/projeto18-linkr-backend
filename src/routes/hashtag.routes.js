import { Router } from "express";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag/:hashtag");

export default hashtagRouter;
