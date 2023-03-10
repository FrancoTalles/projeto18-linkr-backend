import { Router } from "express";

import { createPost, deletePost, getPosts, getUserPosts, updatePost } from "../controllers/postController.js";

import schemaValidation from "../middlewares/schemaValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

import { newPostSchema, updatePostSchema } from "../schemas/postSchemas.js";

const postRouter = Router();

postRouter.get("/posts", tokenValidation, getPosts);
postRouter.post("/posts", tokenValidation, schemaValidation(newPostSchema), createPost);
postRouter.put("/posts", tokenValidation, schemaValidation(updatePostSchema), updatePost);
postRouter.delete("/posts/:id", tokenValidation, deletePost);
postRouter.get("/user/:id", tokenValidation, getUserPosts);

export default postRouter;