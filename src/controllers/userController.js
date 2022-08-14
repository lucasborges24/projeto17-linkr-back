import { getUsernamesLikedPost } from "../repositories/likesRepository.js";
import {
  getUserPostsById,
  searchUsers,
} from "../repositories/userRepository.js";

export const getUserPosts = async (req, res) => {
  const { user } = res.locals;

  try {
    const { rows: posts } = await getUserPostsById(user.id);

    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const { rows: likesUsername } = await getUsernamesLikedPost(
          post.postId
        );

        return {
          ...post,
          likesUsername: likesUsername.map(({ username }) => username),
        };
      })
    );

    return res.send(postsWithLikes);
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
