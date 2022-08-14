import { likeRepository } from "../repositories/index.js";

export async function likePost(req, res) {
  const { postId } = req.body;
  const { userId } = res.locals.userId;

  try {
    if (postId && userId) {
      const { rows: like } = await likeRepository.insertLike(postId, userId);
      return res.status(200).send(like);
    }
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
}
