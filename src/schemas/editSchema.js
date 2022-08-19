import joi from "joi";

const editSchema = joi.object({
  description: joi.string().max(280),
});
export default editSchema;
