import { hashtagReposity } from "../repositories/index.js";

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  try {
    const { rows: hashtags } = await hashtagReposity.getHashtageByName(hashtag);
    const [valideteHashtag] = hashtags;
    if (!valideteHashtag) {
      return res.sendStatus(404);
    }
    const result = await hashtagReposity.getPostsByHashtag(hashtag);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getTopHashtags(req, res) {
  try {
    const { rows: hashtags } = await hashtagReposity.getMostUsedHashtags(10);
    return res.status(200).send(hashtags);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
