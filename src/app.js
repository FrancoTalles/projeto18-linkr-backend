import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import postRouter from "./routes/postsRoutes.js";

import authRouter from "./routes/authRoutes.js";

import hashtagRouter from "./routes/hashtagRoutes.js";

import likesRouter from "./routes/likesRoutes.js";

import usersRouter from "./routes/usersRoutes.js";

import rePostRouter from "./routes/rePostRoutes.js";

import followRouter from "./routes/followRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([authRouter, postRouter, hashtagRouter, likesRouter, usersRouter, rePostRouter, followRouter]);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
