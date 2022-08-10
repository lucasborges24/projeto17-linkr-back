import { Router } from "express";

import { authRouter } from "./authRoute.js";
import { userRouter } from "./userRoute.js";

import hashtagRouter from "./hashtagRoute.js";

const router = Router();
router.use(authRouter);
router.use(hashtagRouter);
router.use(userRouter);

export default router;
