import { Router } from "express";
import { getUserPosts, getUsers } from "../controllers/userController.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { checkUserExists, validateParamsId } from "../middlewares/userMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";

import { searchSchema } from "../schemas/searchSchema.js";

const userRouter = Router();

userRouter.get(
  "/user/:id",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  validateParamsId,
  checkUserExists,
  getUserPosts
);
userRouter.post(
  "/search",
  validateHeaderSchema(tokenSchema),
  validateSchema(searchSchema),
  checkTokenBelongsSomeUser,
  getUsers
);

export { userRouter };
