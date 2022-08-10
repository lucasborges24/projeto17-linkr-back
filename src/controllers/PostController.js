import { postRepository } from "../repositories/index.js";
import dayjs from "dayjs";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postRepository.getAllPosts();
    const [post] = posts;
    urlMetadata(`${post.url}`).then(
      function (metadata) {
        console.log(metadata);
      },
      function (error) {
        console.log(error);
      }
    );
    return res.sendStatus(200).send(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openUrlPost(req, res) {
  try {
    const { url } = req.params;
    const { rows: posts } = await postRepository.getUrlPost(url);
    const [link] = posts;
    if (posts.length === 0) {
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
