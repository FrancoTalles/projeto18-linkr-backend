import joi from "joi";

export const newPostSchema = joi.object({
  link: joi.string().uri().required(),
  description: joi.string().allow(""),
});

export const updatePostSchema = joi.object({
  postId: joi.number().integer().required(),
  description: joi.string().allow(""),
});
