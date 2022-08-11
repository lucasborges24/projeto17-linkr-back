import { Router } from "express";

import { authRouter } from "./authRoute.js";
import { userRouter } from "./userRoute.js";
import { postRouter } from "./postsRoute.js";

import hashtagRouter from "./hashtagRoute.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(hashtagRouter);
router.use(postRouter);

export default router;
