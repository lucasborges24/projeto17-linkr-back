import { Router } from "express";

import { authRouter } from "./authRoute.js";
import { userRouter } from "./userRoute.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);

export default router;
