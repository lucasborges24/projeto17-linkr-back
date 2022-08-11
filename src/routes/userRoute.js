import { Router } from "express";
import { getUser, getUsers } from "../controllers/userController.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { checkUserExists } from "../middlewares/userMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";

import { searchSchema } from "../schemas/searchSchema.js";

const userRouter = Router();

userRouter.get("/user/:id", checkUserExists, getUser);
userRouter.post(
  "/search",
  validateHeaderSchema(tokenSchema),
  validateSchema(searchSchema),
  checkTokenBelongsSomeUser,
  getUsers
);


export { userRouter };
