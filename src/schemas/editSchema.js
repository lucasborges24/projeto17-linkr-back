import joi from "joi";

const editSchema = joi.object({
  description: joi.string(),
});
export default editSchema;
