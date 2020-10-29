const Joi = require('joi');


const createUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().min(3).required(),
    repeat_password: Joi.ref('password'),
});


module.exports = {
    createUserSchema,
}