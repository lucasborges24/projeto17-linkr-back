import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const checkTokenBelongsSomeUser = (req, res, next) => {
  const token = res.locals.headers.authorization.split(" ")[1];
  const { JWT_SECRETKEY } = process.env;
  try {
    const { userId } = jwt.verify(token, JWT_SECRETKEY);
    res.locals.userId = userId;
    next();
  } catch (error) {
    res
      .status(404)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};
