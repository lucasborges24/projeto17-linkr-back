import { hashtagReposity } from "../repositories/index.js";
import { getUsernamesLikedPost } from "../repositories/likesRepository.js";
export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  try {
    const { rows: hashtags } = await hashtagReposity.getHashtageByName(hashtag);
    const [validateHashtag] = hashtags;
    if (!validateHashtag) {
      return res
        .status(404)
        .send(`It was not possible find posts with #${hashtag}`);
    }
    const { rows: result } = await hashtagReposity.getPostsByHashtag(hashtag);
    const postsWithLikes = await Promise.all(
      result.map(async (post) => {
        const { rows: likesUsername } = await getUsernamesLikedPost(
          post.postId
        );

        return {
          ...post,
          likesUsername: likesUsername.map(({ username }) => username),
        };
      })
    );
    return res.status(200).send(postsWithLikes);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getTopHashtags(req, res) {
  const MOST_VIEWED_HASHTAGS_LIMIT = 10;
  try {
    const { rows: hashtags } = await hashtagReposity.getMostUsedHashtags(
      MOST_VIEWED_HASHTAGS_LIMIT
    );
    return res.status(200).send(hashtags);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
