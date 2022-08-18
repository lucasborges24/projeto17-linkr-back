import { Router } from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import metadataUrl from "../middlewares/metadataMiddleware.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
import publishSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get(
  "/timeline",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  getPosts
);
postRouter.post(
  "/posts",
  validateHeaderSchema(tokenSchema),
  validateSchema(publishSchema),
  checkTokenBelongsSomeUser,
  metadataUrl,
  createPost
);

export { postRouter };
