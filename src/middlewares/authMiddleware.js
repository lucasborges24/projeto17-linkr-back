import {
  getPasswordByEmail,
  getUserByEmail,
  getUserByUsername,
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

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

export const checkPasswordByEmail = async (req, res, next) => {
  const { email, password } = res.locals.body;
  const { rows: passwordCrypt } = await getPasswordByEmail(email);
  if (!passwordCrypt || passwordCrypt.length === 0) {
    return res.status(401).send("Email or password wrong!");
  }

  const passwordIsValid = bcrypt.compareSync(password, passwordCrypt[0].password);
  if (!passwordIsValid) {
    return res.status(401).send("Email or password is wrong!");
  }
  next();
};
