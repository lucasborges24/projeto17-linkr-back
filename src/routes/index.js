import { Router } from "express";
import { postRouter } from "./postsRoutes.js";

import { authRouter } from "./authRoute.js";
import { userRouter } from "./userRoute.js";
import { postRouter } from "./postsRoute.js";

import hashtagRouter from "./hashtagRoute.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(hashtagRouter);
router.use(postRouter);
router.use(userRouter);

export default router;
