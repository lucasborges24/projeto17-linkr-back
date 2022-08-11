import { postRepository } from "../repositories/index.js";
import dayjs from "dayjs";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postRepository.getAllPosts();

    const arr = [];

    for (let i = 0; i < posts.length; i++) {
      const metadata = await urlMetadata(posts[i].url);
      

      const urlData = {
        title: metadata.title,
        description: metadata.description,
        image: metadata.image,
      };
      console.log(urlData);

       arr.push(Object.assign(posts[i], { urlData }));
    }

    res.status(200).send(arr);
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
