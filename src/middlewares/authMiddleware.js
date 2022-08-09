import {
  getUserByEmail,
  getUserByUsername,
} from "../repositories/authRepository.js";

export const checkEmailAlreadyExists = async (req, res, next) => {
  const { email } = res.locals.body;

  try {
    const { rowCount: emailCount } = await getUserByEmail(email);
    if (emailCount > 0) {
      return res.status(409).send("Email already exists!");
    }
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
  next();
};

export const checkUsernameAlreadyExists = async (req, res, next) => {
  const { username } = res.locals.body;

  try {
    const { rowCount: usernameCount } = await getUserByUsername(username);
    if (usernameCount > 0) {
      return res.status(409).send("Username already exists!");
    }
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
  next();
};
