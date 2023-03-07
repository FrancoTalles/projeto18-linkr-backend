import joi from "joi";

export const newUserSchema = joi.object({
    email: joi.string().email().min(13).required(),
    password: joi.string().min(6).required(),
    username: joi.string().min(3).required(),
    pictureURL: joi.string().uri().required()
});