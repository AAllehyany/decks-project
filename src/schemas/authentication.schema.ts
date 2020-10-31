import Joi from 'joi';

export const authenticationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});