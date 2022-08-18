import { getFollowerByIds } from "../repositories/followRepository.js";
import { getUsernamesLikedPost } from "../repositories/likesRepository.js";
import {
  getUser,
  getUserPostsById,
  searchUsers,
} from "../repositories/userRepository.js";

export const getUserPosts = async (req, res) => {
  const { user } = res.locals;
  const { page } = req.query;
  const { userId } = res.locals;

  const pageNumber = Number(page);

  if (!pageNumber || pageNumber < 1) {
    return res.status(401).send("Informe uma página válida");
  }

  try {
    const { rows: userInfo } = await getUser(user.id);
    const { rows: posts } = await getUserPostsById(user.id);
    const { rowCount } = await getFollowerByIds(userId, user.id);

    const limit = 10;
    const start = (pageNumber - 1) * limit;
    const end = pageNumber * limit;

    let arrayPosts = [];
    let hasMorePosts = true;

    if (posts.length <= 10) {
      arrayPosts = [...posts];
      hasMorePosts = false;
    } else {
      arrayPosts = posts.slice(start, end);

      if (arrayPosts.length < 10) {
        hasMorePosts = false;
      }
    }

    const postsWithLikes = await Promise.all(
      arrayPosts.map(async (post) => {
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
      hasMorePosts,
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
