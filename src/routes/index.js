import { Router } from "express";

import hashtagRouter from "./hashtagRoute.js";

const router = Router();
router.use(hashtagRouter);

export default router;
