import { likeRepository } from "../repositories/index.js";

export async function likePost(req, res) {
  try {
    const { postId } = req.params;
    const userId = res.locals.userId;

    const { rows: like } = await likeRepository.getLike(postId, userId);

    if (like.length > 0) {
      await likeRepository.removeLike(postId, userId);
      return res.status(200).send("deslike");
    }

    if (postId && userId) {
      await likeRepository.insertLike(postId, userId);
      return res.status(200).send("liked");
    }
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
}

export async function getLikes(req, res) {
  try {
    const { postId } = req.body;

    const { rows: likes } = await likeRepository.getLikesPost(postId);

    res.status(200).send(likes);
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
}
