import { Router } from "express";

import { getUser, getUsers } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { checkUserExists } from "../middlewares/userMiddleware.js";
import { searchSchema } from "../schemas/searchSchema.js";

const userRouter = Router();

userRouter.get("/user/:id", checkUserExists, getUser);
userRouter.post("/search", validateSchema(searchSchema), getUsers);

export { userRouter };
