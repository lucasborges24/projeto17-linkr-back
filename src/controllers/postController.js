import { postRepository } from "../repositories/index.js";

export async function deletePost(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;
  try {
    const { rows: post } = await postRepository.getPostById(id);
    if (post.length < 1) return res.status(404).send("Post not found");
    console.log(post);
    if (userId !== post[0].writerId) {
      return res.status(401).send("Unauthorized, you are not the post owner");
    }
    await postRepository.deletePostById(id);
    res.status(204).send("Post deleted successfully");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;
  const description = req.body;
  try {
    const { rows: post } = await postRepository.getPostById(id);
    console.log(post[0]);
    if (userId !== post[0].writerId) {
      return res.status(401).send("Unauthorized, you are not the post owner");
    }
    await postRepository.updatePost(description, id);
    return res.status(200).send("Post edited successfully");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
