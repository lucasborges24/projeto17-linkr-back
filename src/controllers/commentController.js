// import { postRepository, hashtagReposity } from "../repositories/index.js";

import {
  getPostComments,
  insertComment,
} from "../repositories/commentRepository.js";
import { postRepository } from "../repositories/index.js";

export async function postComment(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;
  const { comment } = req.body;
  try {
    const { rows: post } = await postRepository.getPostById(postId);
    if (post.length < 1) return res.status(404).send("Post not found");
    await insertComment(userId, postId, comment);

    res.status(201).send("Comment posted successfully");
  } catch (err) {
    res.sendStatus(500);
  }
}
export async function getCommentsByPostId(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    const { rows: post } = await postRepository.getPostById(postId);
    if (post.length < 1) return res.status(404).send("Post not found");
    const { rows: comments } = await getPostComments(postId, userId);

    res.status(200).send(comments);
  } catch (err) {
    res.sendStatus(500);
  }
}
