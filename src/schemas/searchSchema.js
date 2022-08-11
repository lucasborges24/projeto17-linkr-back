import joi from "joi";

export const searchSchema = joi.object({
  username: joi.string().trim().required(),
});
