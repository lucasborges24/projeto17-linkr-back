import { Router } from "express";
import { postRouter } from "./PostsRoutes.js";

const router = Router();
router.use(postRouter);

export default router;
