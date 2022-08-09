import { Router } from "express";

import { signUpSchema } from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import {
  checkEmailAlreadyExists,
  checkUsernameAlreadyExists,
} from "../middlewares/authMiddleware.js";
import { signup } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchema(signUpSchema),
  checkEmailAlreadyExists,
  checkUsernameAlreadyExists,
  signup
);
authRouter.post("/signin", (req, res) => res.send("funfei de boas"));

export { authRouter };
