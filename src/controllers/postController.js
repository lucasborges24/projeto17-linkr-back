import { postRepository, hashtagReposity } from "../repositories/index.js";
import { getUsernamesLikedPost } from "../repositories/likesRepository.js";

export async function getPosts(req, res) {
  try {
    //const { hashtag } = req.query;

    const { rows: posts } = await postRepository.getAllPosts();

    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const { rows: likesUsername } = await getUsernamesLikedPost(
          post.postId
        );

        return {
          ...post,
          likesUsername: likesUsername.map(({ username }) => username),
        };
      })
    );

    res.status(200).send(postsWithLikes);
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
}

export async function createPost(req, res) {
  try {
    const { userId, urlTitle, urlDescription, urlImage } = res.locals;
    const { url, description } = req.body;
    const { rows: post } = await postRepository.insertPost(
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

      if (hashtagsPosts.length > 0) {
        for (let i = 0; i < hashtagsPosts.length; i++) {
          const { rows: hashtags } = await hashtagReposity.getHashtags(
            hashtagsPosts[i]
          );
          if (hashtags[0].length === 0) {
            const { rows: postHashtags } = await hashtagReposity.createHashtags(
              hashtagsPosts[i]
            );
            console.log(postHashtags[0]);
            await postRepository.insertHashtagPost(
              post[0].id,
              postHashtags[0].id
            );
          } else {
            await postRepository.insertHashtagPost(post[0].id, hashtags[0].id);
          }
        }
      }
      /* for (let i = 0; i < hashtags.length; i++) {
        for (let j = 0; j < hashtagsPosts.length; j++) {
          if (hashtagsPosts[j] === hashtags[i].name) {
            //await postRepository.insertHashtagPost(postId, hashCurrent[i].id);
          }
        }
      } */
    }

    res.status(201).send("Your post was created");
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
}
