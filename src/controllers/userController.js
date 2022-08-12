import {
  getUserPostsById,
  searchUsers,
} from "../repositories/userRepository.js";

export const getUserPosts = async (req, res) => {
  const { user } = res.locals;

  try {
    const { rows: posts } = await getUserPostsById(user.id);

    return res.send(posts);
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
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
