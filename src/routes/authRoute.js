import { Router } from "express";

import { signInSchema, signUpSchema, tokenSchema } from "../schemas/authSchema.js";
import { validateHeaderSchema, validateSchema } from "../middlewares/schemaMiddleware.js";
import {
  checkEmailAlreadyExists,
  checkPasswordByEmail,
  checkUsernameAlreadyExists,
} from "../middlewares/authMiddleware.js";
import { signin, signup } from "../controllers/authController.js";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchema(signUpSchema),
  checkEmailAlreadyExists,
  checkUsernameAlreadyExists,
  signup
);
authRouter.post(
  "/signin",
  validateSchema(signInSchema),
  checkPasswordByEmail,
  signin
);

export { authRouter };
