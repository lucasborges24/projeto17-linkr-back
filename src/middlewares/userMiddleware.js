import { getUserPostsById } from "../repositories/userRepository.js";

export const checkUserExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows: user } = await getUserPostsById(id);
    if (!user[0]) {
      return res.status(404).send("User not found!");
    }

    delete user[0].password;

    res.locals.user = user[0];

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};
