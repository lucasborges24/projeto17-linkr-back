import joi from "joi";

const publishSchema = joi.object({
  url: joi.string().uri().required().trim(),
  description: joi.string(),
});

export default publishSchema;
