import { Router } from "express";
import { postRouter } from "./postsRoutes.js";

import { authRouter } from "./authRoute.js";

import hashtagRouter from "./hashtagRoute.js";

const router = Router();
router.use(postRouter);

router.use(authRouter);
router.use(hashtagRouter);

export default router;
