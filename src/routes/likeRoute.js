import { Router } from "express";
import { likePost } from "../controllers/likeController";
import { validateHeaderSchema } from "../middlewares/schemaMiddleware";
import { tokenSchema } from "../schemas/authSchema";
const likeRouter = Router();

likeRouter.post("/like", validateHeaderSchema(tokenSchema), likePost);

export { likeRouter };
