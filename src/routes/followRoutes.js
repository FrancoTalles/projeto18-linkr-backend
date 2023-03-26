import { Router } from "express";
import { followStatus, toggleFollow } from "../controllers/followControllers.js";
import { statusValidation, toggleValidation } from "../middlewares/followMiddlewares.js";


const followRouter = Router();

followRouter.post("/follow/status", statusValidation, followStatus);
followRouter.post("/follow/toggle", toggleValidation, toggleFollow);

export default followRouter;
