import { Router } from "express";

import { createPost, deletePost, getPosts, getUserPosts, updatePost } from "../controllers/postController.js";
import { insertComment, getComments } from "../controllers/commentsController.js";

import schemaValidation from "../middlewares/schemaValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

import { newPostSchema, updatePostSchema } from "../schemas/postSchemas.js";
import { commentSchema } from "../schemas/commentSchemas.js";

const postRouter = Router();

postRouter.get("/posts", tokenValidation, getPosts);
postRouter.post("/posts", tokenValidation, schemaValidation(newPostSchema), createPost);
postRouter.post("/posts/comment", tokenValidation, schemaValidation(commentSchema), insertComment);
postRouter.get("/posts/comment/:id", tokenValidation, getComments);
postRouter.put("/posts", tokenValidation, schemaValidation(updatePostSchema), updatePost);
postRouter.delete("/posts/:id", tokenValidation, deletePost);
postRouter.get("/user/:id", tokenValidation, getUserPosts);

export default postRouter;