import joi from "joi";

export const commentSchema = joi.object({
  postId: joi.number().integer().required(),
  comment: joi.string().required(),
});