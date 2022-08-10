import { Router } from "express";

import { getUser } from "../controllers/userController.js";
import { checkUserExists } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.get("/user/:id", checkUserExists, getUser);

export { userRouter };
