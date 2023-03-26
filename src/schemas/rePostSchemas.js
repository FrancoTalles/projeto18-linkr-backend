import joi from "joi";

export const rePostSchema = joi.object({
  postId: joi.number().integer().required(),
});

export const rePostUpdateSchema = joi.object({
  postId: joi.number().integer().required(),
  userId: joi.number().integer().required(),
  description: joi.string().allow(""),
});