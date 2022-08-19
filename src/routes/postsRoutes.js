import { Router } from "express";
import {
  createPost,
  getNewPostsTimeline,
  getPosts,
} from "../controllers/postController.js";
import metadataUrl from "../middlewares/metadataMiddleware.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
import publishSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get("/timeline", getPosts);
postRouter.get("/timeline/:postId", getNewPostsTimeline);
postRouter.post(
  "/posts",
  validateHeaderSchema(tokenSchema),
  validateSchema(publishSchema),
  checkTokenBelongsSomeUser,
  metadataUrl,
  createPost
);

export { postRouter };
