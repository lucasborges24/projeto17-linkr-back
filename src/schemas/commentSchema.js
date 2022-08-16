import joi from "joi";

const commentSchema = joi.object({
  comment: joi.string().max(280).required(),
});
export default commentSchema;
