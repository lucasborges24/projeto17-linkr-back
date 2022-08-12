import { postRepository } from "../repositories/index.js";

export async function getPosts(req, res) {
  try {
    //const { hashtag } = req.query;

    const { rows: posts } = await postRepository.getAllPosts();

    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createdPost(req, res) {
  try {
    const { postId, userId, urlTitle, urlDescription, urlImage } = res.locals;
    const { url, description } = req.body;
    await postRepository.insertPost(
      userId,
      url,
      description,
      urlTitle,
      urlDescription,
      urlImage
    );

    if (description) {
      const arr = description.split(" ");
      const hashtagsFilter = arr.filter((hashtag) => hashtag.startsWith("#"));
      const hashtagsPosts = [];

      for (let i = 0; i < hashtagsFilter.length; i++) {
        hashtagsPosts.push(
          hashtagsFilter[i].replace(/,/g, "").replace(/\./g, "")
        );
      }

      const { rows: hashtags } = await postRepository.getHashtags();

      for (let i = 0; i < hashtags.length; i++) {
        for (let j = 0; j < hashtagsPosts.length; j++) {
          if (hashtagsPosts[j] === hashtags[i]) {
            await postRepository.insertHashtagPost(postId, hashtags[i].id);
          }
        }
      }
    }

    res.status(201).send("Your post was created");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
