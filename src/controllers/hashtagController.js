import { hashtagReposity } from "../repositories/index.js";

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  try {
    const { rows: hashtags } = await hashtagReposity.getHashtageByName(hashtag);
    const [validateHashtag] = hashtags;
    if (!validateHashtag) {
      return res
        .status(404)
        .send(`Não foi encontrado posts com a tag referente a ${hashtag}`);
    }
    const { rows: result } = await hashtagReposity.getPostsByHashtag(hashtag);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getTopHashtags(req, res) {
  const MOST_VIEWED_HASHTAGS_LIMIT = 10;
  try {
    const { rows: hashtags } = await hashtagReposity.getMostUsedHashtags(
      MOST_VIEWED_HASHTAGS_LIMIT
    );
    return res.status(200).send(hashtags);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
