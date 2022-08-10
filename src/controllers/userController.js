import { searchUsers } from "../repositories/userRepository.js";

export const getUser = async (req, res) => {
  const { user } = res.locals;

  return res.send("ok");
};

export const getUsers = async (req, res) => {
  const { body } = res.locals;
  const { username } = body;

  try {
    const { rows: users } = await searchUsers(username);

    return res.send(users);
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};
