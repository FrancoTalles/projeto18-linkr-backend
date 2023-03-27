import { Router } from "express";
import { followStatus, getFollowers, toggleFollow } from "../controllers/followControllers.js";
import { statusValidation, toggleValidation } from "../middlewares/followMiddlewares.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";


const followRouter = Router();

followRouter.post("/follow/status", statusValidation, followStatus);
followRouter.post("/follow/toggle", toggleValidation, toggleFollow);
followRouter.get("/followers", tokenValidation, getFollowers);

export default followRouter;
