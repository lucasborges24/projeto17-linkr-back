import { Router } from "express";
import {
  createdPost,
  getPosts,
} from "../controllers/postController.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
import publishSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get("/timeline", getPosts);
postRouter.post(
  "/posts",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  validateSchema(publishSchema),
  createdPost
);

export { postRouter };
