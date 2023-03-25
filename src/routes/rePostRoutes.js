import { Router } from "express";

import schemaValidation from "../middlewares/schemaValidation.js";
import { rePostSchema } from "../schemas/rePostSchemas.js";

import { tokenValidation } from "../middlewares/tokenValidation.js";

import { createRePost } from "../controllers/rePostController.js";

const rePostRouter = Router();

rePostRouter.post("/repost", tokenValidation, schemaValidation(rePostSchema), createRePost); 

export default rePostRouter;