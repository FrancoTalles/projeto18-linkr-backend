import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import postRouter from "./routes/postsRouter.js";

import authRouter from "../src/routes/auth.routes.js";
import hashtagRouter from "./routes/hashtag.routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([authRouter, postRouter,hashtagRouter]);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server runnin on port ${port}`));
