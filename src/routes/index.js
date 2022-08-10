import { Router } from "express";

import { authRouter } from "./authRoute.js";

import hashtagRouter from "./hashtagRoute.js";

const router = Router();
router.use(authRouter);
router.use(hashtagRouter);

export default router;
