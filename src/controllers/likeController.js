import { likeRepository } from "../repositories/index.js";

export async function likePost(req, res) {
  try {
    const { postId } = req.body;
    const userId = res.locals.userId;

    if (postId && userId) {
      await likeRepository.insertLike(postId, userId);
      return res.status(200).send("liked");
    }
    res.sendStatus(403);
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
}
