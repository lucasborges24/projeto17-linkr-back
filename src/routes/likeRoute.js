import { Router } from "express";
import { getLikes, likePost } from "../controllers/likeController.js";
import { validateHeaderSchema } from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
const likeRouter = Router();

likeRouter.post(
  "/like/:postId",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  likePost
);

likeRouter.get(
  "/like",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  getLikes
);

export { likeRouter };
