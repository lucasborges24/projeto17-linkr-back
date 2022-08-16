import { followRepository } from "../repositories/index.js";

export const insertFollow = async (req, res) => {
  const { id } = req.params;
  const { userId } = res.locals;
  try {
    const RelationshipExists = await checkUserIsAlreadyFollowed(userId, id);
    if (RelationshipExists) {
        return res.status(400).send("This user is already followed!")
    }
    await followRepository.insertFollow(userId, id);
    res.status(201).send("User followed!");
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};

const checkUserIsAlreadyFollowed = async (followerId, followedId) => {
  try {
    const { rowCount } = await followRepository.getFollowerByIds(
      followerId,
      followedId
    );
    if (rowCount > 0) {
      return true;
    }
    return false;
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};

export const deleteFollow = async (req, res) => {
    const {id} = req.params;
    const {userId} = res.locals;
    try {
        const RelationshipExists = await checkUserIsAlreadyFollowed(userId, id);
        if (!RelationshipExists) {
            return res.status(404).send("This user is not followed!")
        }
        await followRepository.deleteFollow(userId, id);
        res.status(200).send("User removed from followed table!")
    } catch (error) {
        res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
    }
}