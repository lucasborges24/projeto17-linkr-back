import { Router } from "express";
import {
  getCommentsByPostId,
  postComment,
} from "../controllers/commentController.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
import commentSchema from "../schemas/commentSchema.js";

const commentRouter = Router();

commentRouter.post(
  "/comment/:postId",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  validateSchema(commentSchema),
  postComment
);

commentRouter.get(
  "/comment/:postId",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  getCommentsByPostId
);
export { commentRouter };
