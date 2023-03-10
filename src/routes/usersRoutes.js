import { Router } from "express";
import { getUsers } from "../controllers/usersController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const usersRouter = Router();

usersRouter.get('/users/:name', tokenValidation, getUsers);

export default usersRouter;