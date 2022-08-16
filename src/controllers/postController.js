import { postRepository, hashtagReposity } from "../repositories/index.js";
import { getUsernamesLikedPost } from "../repositories/likesRepository.js";

export async function deletePost(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;
  try {
    const { rows: post } = await postRepository.getPostById(id);
    if (post.length < 1) return res.status(404).send("Post not found");
    if (userId !== post[0].writerId) {
      return res.status(401).send("Unauthorized, you are not the post owner");
    }
    await postRepository.deletePostById(id);
    res.status(204).send("Post deleted successfully");
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;
  const { description } = req.body;
  try {
    const { rows: post } = await postRepository.getPostById(id);
    if (userId !== post[0].writerId) {
      return res.status(401).send("Unauthorized, you are not the post owner");
    }
    await postRepository.deleteHashtagsPosts(id)
    console.log(id);
    if (description) {

      const arr = description.split(" ");
      const hashtagsFilter = arr.filter((hashtag) => hashtag.startsWith("#"));
      const hashtagsPosts = [];
      for (let i = 0; i < hashtagsFilter.length; i++) {
        hashtagsPosts.push(
          hashtagsFilter[i]
            .replace(/,/g, "")
            .replace(/\./g, "")
            .replace("#", "")
        );
      }
      if (hashtagsPosts.length > 0) {
        for (let i = 0; i < hashtagsPosts.length; i++) {
          const { rows: hashtags } = await hashtagReposity.getHashtags(
            hashtagsPosts[i]
          );

          if (hashtags.length === 0) {
            await hashtagReposity.createHashtags(hashtagsPosts[i]);
            const { rows: idHashtag } = await hashtagReposity.getHashtags(
              hashtagsPosts[i]
            );

            await postRepository.insertHashtagPost(post[0].id, idHashtag[0].id);
          } else {
            await postRepository.insertHashtagPost(post[0].id, hashtags[0].id);
          }
        }
      }
    }
    await postRepository.updatePost(description, id);
    return res.status(200).send("Post edited successfully");
  } catch (error) {
    res.sendStatus(500);
  }
}
export async function getPosts(req, res) {
  try {
    //const { page } = req.query;
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
    await postRepository.insertPost(
      userId,
      url,
      description,
      urlTitle,
      urlDescription,
      urlImage
    );
    const { rows: post } = await postRepository.getPostByUserId(userId);

    if (description) {
      const arr = description.split(" ");
      const hashtagsFilter = arr.filter((hashtag) => hashtag.startsWith("#"));
      const hashtagsPosts = [];

      for (let i = 0; i < hashtagsFilter.length; i++) {
        hashtagsPosts.push(
          hashtagsFilter[i]
            .replace(/,/g, "")
            .replace(/\./g, "")
            .replace("#", "")
        );
      }
      if (hashtagsPosts.length > 0) {
        for (let i = 0; i < hashtagsPosts.length; i++) {
          const { rows: hashtags } = await hashtagReposity.getHashtags(
            hashtagsPosts[i]
          );

          if (hashtags.length === 0) {
            await hashtagReposity.createHashtags(hashtagsPosts[i]);
            const { rows: idHashtag } = await hashtagReposity.getHashtags(
              hashtagsPosts[i]
            );

            await postRepository.insertHashtagPost(post[0].id, idHashtag[0].id);
          } else {
            await postRepository.insertHashtagPost(post[0].id, hashtags[0].id);
          }
        }
      }
    }

    res.status(201).send("Your post was created");
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
}

export async function sharePost(req, res) {
	try {
		const {id} = req.params;
		const { userId } = res.locals;
		await postRepository.insertSharedPost(id, userId);
		res.status(201).send("You shared this post");
	} catch (error) {
	  res
		.status(500)
		.send(`Internal system error.\n More details: ${error.message}`);
	}
  }