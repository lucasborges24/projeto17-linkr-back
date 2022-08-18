import { getFollowerByIds } from "../repositories/followRepository.js";
import { getUsernamesLikedPost } from "../repositories/likesRepository.js";
import {
  getUser,
  getUserPostsById,
  searchUsers,
} from "../repositories/userRepository.js";

export const getUserPosts = async (req, res) => {
  const { user } = res.locals;
  const { userId } = res.locals;
  try {
    const { rows: userInfo } = await getUser(user.id);
    const { rows: posts } = await getUserPostsById(user.id);
    const { rowCount } = await getFollowerByIds(userId, user.id);

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

    const postObject = {
      userId: userInfo[0].id,
      username: userInfo[0].username,
      picture: userInfo[0].picture,
      isFollowed: isFollowed(rowCount),
      postsInfo: postsWithLikes,
    };
    return res.send(postObject);
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};

const isFollowed = (FollowParam) => {
  if (FollowParam === 0) {
    return false;
  } else {
    return true;
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
