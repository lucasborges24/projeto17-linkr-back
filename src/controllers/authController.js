import bcrypt from "bcrypt";

import { insertUserinUsers } from "../repositories/authRepository.js";

const SALT = 10;

export const signup = async (req, res) => {
  const { body } = res.locals;
  const passwordCrypt = bcrypt.hashSync(body.password, SALT);
  const newUser = { ...body, password: passwordCrypt };
  try {
    const insered = await insertUserinUsers(newUser);
    return res.status(201).send("User registered!");
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};
