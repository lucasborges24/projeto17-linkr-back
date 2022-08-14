import { Router } from "express";
import { likePost } from "../controllers/likeController.js";
import { validateHeaderSchema } from "../middlewares/schemaMiddleware.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";
import { tokenSchema } from "../schemas/authSchema.js";
const likeRouter = Router();

likeRouter.post(
  "/like",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  likePost
);

export { likeRouter };
