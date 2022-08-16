import { getUser } from "../repositories/userRepository.js";

export const checkUserExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows: user } = await getUser(id);
    if (!user[0]) {
      return res.status(404).send("User not found!");
    }

    res.locals.user = user[0];

    next();
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};

export const validateParamsId = (req, res, next) => {
  const id = Number(req.params.id)
  const NotANumber = isNaN(id);
  const isInteger = Number.isInteger(id);
  if (NotANumber || !isInteger) {
    return res.status(404).send("id is not a integer number!");
  }

  next();
};
