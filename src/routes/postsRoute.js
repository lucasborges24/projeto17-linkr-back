import { Router } from "express";
import { deletePost, editPost } from "../controllers/postController.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
import editSchema from "../schemas/editSchema.js";

const postRouter = Router();

postRouter.delete(
  "/post/:id",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  deletePost
);
postRouter.put(
  "/post/:id",
  validateSchema(editSchema),
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  editPost
);

export { postRouter };