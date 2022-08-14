import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import {
  getUserByEmail,
  insertUserinUsers,
} from "../repositories/authRepository.js";

dotenv.config();
const EXPIRE_TIME_SECONDS = 60 * 60;
const jwtExpire = {
  expiresIn: EXPIRE_TIME_SECONDS,
};
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

export const signin = async (req, res) => {
  const { email } = res.locals.body;
  try {
    const { rows: user } = await getUserByEmail(email);
    const { id: userId } = user[0];
    const userProfile = {
      userId,
      userPicture: user[0].picture,
      userName: user[0].username,
    };

    const data = { userId };
    const { JWT_SECRETKEY } = process.env;
    const token = jwt.sign(data, JWT_SECRETKEY, jwtExpire);
    res.status(200).send({ token, userProfile });
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};
