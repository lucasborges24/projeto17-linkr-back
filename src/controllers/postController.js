import { postRepository } from "../repositories/index.js";
import dayjs from "dayjs";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postRepository.getAllPosts();

    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createdPost(req, res) {
  try {
    const { userId } = res.locals;
    const { url, description } = req.body;
    const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    await postRepository.insertPost(userId, url, description, createdAt);

    res.status(201).send("Your post was created");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
