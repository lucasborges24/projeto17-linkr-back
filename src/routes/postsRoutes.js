import { Router } from "express";
import {
  createPost,
  getNewPostsTimeline,
  getPosts,
  sharePost,
} from "../controllers/postController.js";
import metadataUrl from "../middlewares/metadataMiddleware.js";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import {checkUserSharedPost} from "../middlewares/sharedMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
import publishSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get(
  "/timeline",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  getPosts
);
postRouter.get("/timeline/:postId", getNewPostsTimeline);
postRouter.post(
  "/posts",
  validateHeaderSchema(tokenSchema),
  validateSchema(publishSchema),
  checkTokenBelongsSomeUser,
  metadataUrl,
  createPost
);
postRouter.post(
	"/share/:id",
	validateHeaderSchema(tokenSchema),
	checkTokenBelongsSomeUser,
	checkUserSharedPost,
	sharePost
);

export { postRouter };
