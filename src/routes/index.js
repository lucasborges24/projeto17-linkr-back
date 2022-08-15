import { Router } from "express";
import { postRouter } from "./postsRoutes.js";
import { postRoute } from "./postsRoute.js";

import { authRouter } from "./authRoute.js";
import { userRouter } from "./userRoute.js";

import hashtagRouter from "./hashtagRoute.js";
import { likeRouter } from "./likeRoute.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(hashtagRouter);
router.use(postRoute);
router.use(postRouter);
router.use(userRouter);
router.use(likeRouter);


export default router;
