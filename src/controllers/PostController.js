import { postRepository } from "../repositories/index.js";
import dayjs from "dayjs";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postRepository.getAllPosts();
    return res.sendStatus(200).send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openUrlPost(req, res) {
  try {
    const { id } = req.params;
    const { rows: url } = await postRepository.getUrlPost(id);
    const [link] = url;
    if (url.length === 0) {
      return res.sendStatus(404);
    }
    return res.redirect(link.url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createdPost(req, res) {
  try {
    const { writerId, url, description } = req.body;
    const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    await postRepository.insertPost(writerId, url, description, createdAt);

    res.status(201).send("Your post was created");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
