const Joi = require('joi');


const createCardSchmea = Joi.object({
    name: Joi.string().required(),
    card_type: Joi.number().min(0).max(2).required(),
    color: Joi.number().min(1).max(4).required(),
    soul: Joi.required().number().min(-1),
    cost: Joi.required().number().min(-1),
    level: Joi.required().number().min(-1),
    power: Joi.required().number().min(-1),
    text: Joi.string().default(''),
});

const searchQuerySchema = Joi.object({
    name: Joi.string(),
    card_type: Joi.number().min(0).max(2),
    color: Joi.number().min(1).max(4),
    soul: Joi.number().min(-1),
    cost: Joi.number().min(-1),
    level: Joi.number().min(-1),
    power: Joi.number().min(-1),
    text: Joi.string(),
})


module.exports = {
    createCardSchmea,
    searchQuerySchema,
}