import { Router } from "express";
import {
  createdPost,
  getPosts,
  openUrlPost,
} from "../controllers/PostController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import publishSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get("/timeline", getPosts);
postRouter.get("/posts/open", openUrlPost);
postRouter.post("/posts", validateSchema(publishSchema), createdPost);

export { postRouter };
