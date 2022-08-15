import joi from "joi";

export const signUpSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required(),
  username: joi.string().min(3).max(30).required(),
  picture: joi
    .string()
    .pattern(
      /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
    )
    .required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required(),
});

export const tokenSchema = joi
  .object({
    authorization: joi
      .string()
      .pattern(/^Bearer .+$/)
      .required(),
  })
  .unknown(true);
