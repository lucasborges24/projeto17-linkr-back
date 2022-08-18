import { Router } from "express";
import { deleteFollow, insertFollow } from "../controllers/followController.js";
import { validateHeaderSchema } from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import {
  checkUserExists,
  validateParamsId,
} from "../middlewares/userMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";

const followRouter = Router();

followRouter.post(
  "/follow/:id",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  validateParamsId,
  checkUserExists,
  insertFollow
);

followRouter.delete(
  "/follow/:id",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  validateParamsId,
  checkUserExists,
  deleteFollow
);

export default followRouter;
