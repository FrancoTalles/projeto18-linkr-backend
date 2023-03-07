import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import postRouter from "./routes/postsRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([postRouter])
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));